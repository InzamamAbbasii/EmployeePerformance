import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ActivityIndicator, SectionList } from 'react-native'
const StudentCourses = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [currentCourses, setCurrentCourses] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    const [permission, setPermission] = useState(false);
    useEffect(() => {
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Student/getCurrentSemesterCources?regno=${route.params.regno}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                response.forEach(element => {
                    setCurrentCourses(data => [...data,
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
                // setIsFetched(false);
            })
            .catch((error) => {
                alert(error)
            })
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
                        Semester: 'Previous'

                    }
                    ])
                });
                setIsFetched(false);
            })
            .catch((error) => {
                alert(error)
            })
    }, [])
    useEffect(() => {
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/getStudentEvaluationPermission`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log('response ::: ', response);
                setPermission(response);
            })
            .catch((error) => {
                alert(error)
            })
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ fontSize: 24, fontFamily: 'ArchitectsDaughter-Regular', textAlign: 'center' }}> {name} </Text>

            {
                isFetched == true ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <SectionList style={{ marginBottom: 10 }}
                            sections={[
                                { title: 'Current Courses', data: currentCourses },
                                { title: 'Previous Courses', data: data },
                            ]}
                            renderSectionHeader={({ section }) => <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>{section.title} </Text>
                            </View>
                            }
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={styles.card} onPress={() => { permission=='true'?(
                                    navigation.navigate('Evaluation', {
                                        Emp_no: item.Emp_no,
                                        Reg_no: item.REG_No,
                                        Course: item.Course_desc
                                    })
                                ):(alert('You are not allowed for Teacher Evalutaion'))
                                }
                                }>
                                    <Text style={{ fontSize: 20, color: '#eee' }}>Current Semster : </Text>
                                    <Text style={{ fontSize: 20, color: '#eee' }}>Course_no : {item.Course_no}</Text>
                                    <Text style={{ fontSize: 20, color: '#eee' }}>Course_desc : {item.Course_desc}</Text>
                                </TouchableOpacity>
                            }
                        />

                    </View>
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
    },
    sectionHeader: {
        flexDirection: 'row',
        marginTop: '5%',
        backgroundColor: '#3EB489',
        justifyContent: 'center',
        marginBottom: 10,
    },
    sectionHeaderText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        padding: 7,
    }
})