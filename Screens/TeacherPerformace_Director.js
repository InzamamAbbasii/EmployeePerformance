// Homescreen.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ToastAndroid, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

const TeacherPerformace_Director = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    const [average, setAverage] = useState(0);
    const [academic, setAcademic] = useState(0);
    const [administrationRatio, setAdministrationRatio] = useState(0);
    const [projectRatio, setProjectRatio] = useState(0);
    const [empName, setEmpName] = useState('');
    useEffect(() => {
        setData([]);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/getEvaluatedTeachers?id=${route.params.Id}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                response.forEach(element => {
                    //getting performace ratio...
                    var InsertApiURL1 = `http://${ip}/EmpPerformanceApi/api/Director/getEmpPerformance?empNo=${element.Emp_No}`;
                    fetch(InsertApiURL1,
                        {
                            method: 'GET',
                        }
                    )
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            setData(data => [...data,
                            {
                                Emp_No: element.Emp_No,
                                tName: element.tName,
                                Academic: response.academic,
                                Administration: response.administration,
                                Project: response.project,
                                Average: response.average,
                                KPI: (response.academic+response.administration+response.project)/3,
                            }
                            ])
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    //
                });
                setIsFetched(false);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <View style={styles.container} >
            {
                isFetched == true ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <View style={{ width: '100%', padding: 20 }}>
                        <FlatList style={{ padding: 7 }}
                            data={data}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity style={{ backgroundColor: '#038f7e', borderRadius: 10,marginBottom:10,padding:10 }}>
                                    <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> {item.tName}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Performace Ratio : </Text>
                                    <View>
                                        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Academic : {item.Academic}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Administration : {item.Administration}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Project : {item.Project}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Average : {item.Average}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>KPI Weight : {item.KPI}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            }
                        />
                    </View>
                )
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    card: {
        borderRadius: 20,
        width: '100%',
        // marginHorizontal: 8,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#eee',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 2.32,
        shadowRadius: 20.46,

        elevation: 5,
    },
    txt: {
        width: "100%",
        fontSize: 30,
        color: 'black',
        borderRadius: 10,
    },
    radiostyle: {
        flexDirection: 'row',
        padding: 5,
        marginLeft: 5,
    },
    btn: {
        backgroundColor: "red",
        borderRadius: 20,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
        fontFamily: "IndieFlower-Regular",
    },
}
)

export default TeacherPerformace_Director;