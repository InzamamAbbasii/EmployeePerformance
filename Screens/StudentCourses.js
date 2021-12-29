import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native'
const StudentCourses = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [isFetched, setIsFetched] = useState(true);
    useEffect(() => {
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Student/getCourseByStd?regno=${route.params.regno}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                response.forEach(element => {
                    setName(element.Std_Name);
                    setData(data => [...data,
                    {
                        Course_no: element.Course_no,
                        REG_No: element.REG_No,
                        Emp_no: element.Emp_no,
                        SEMESTER_NO: element.SEMESTER_NO,
                        SECTION: element.SECTION,
                        DISCIPLINE: element.DISCIPLINE,
                        Course_desc: element.Course_desc,
                    }
                    ])
                });
                setIsFetched(false);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}> {name} </Text>

            {
                isFetched == true ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <FlatList style={{ padding: 7 }}
                        data={data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Evaluation', { Emp_no: item.Emp_no, Reg_no: item.REG_No, Course: item.Course_desc })}>
                                <Text style={{ fontSize: 20, color: '#eee' }}>Course_no : {item.Course_no}</Text>
                                <Text style={{ fontSize: 20, color: '#eee' }}>Course_desc : {item.Course_desc}</Text>
                            </TouchableOpacity>
                        }
                        }
                    />
                )
            }

        </View>
    )
}

export default StudentCourses;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },
    card: {
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 8,
        marginBottom: 10,
        backgroundColor: '#000',
        shadowColor: "#db6363",
        shadowOffset: {
            width: 10,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    btnTouchable: {
        backgroundColor: '#f44336',
        borderWidth: 1,
        borderColor: '#eee',
        height: 45,
        margin: 8,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center'
    }
})