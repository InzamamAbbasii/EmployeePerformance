// Homescreen.js
import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
const TeacherCourses = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log(route.params);
        getCoursesOfTeacher();
    }, [])
    const getCoursesOfTeacher = () => {
        setData([]);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/getCoursesOfTeacher?empNo=${route.params.Emp_No}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                response.forEach(element => {
                    setData(data => [...data,
                    {
                        Emp_no: element.Emp_no,
                        Course_no: element.Course_no,
                        Course_desc: element.Course_desc,
                    }
                    ])
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const checkAlreadyEvaluatedOrNot = (empName, Course_desc,Emp_no, LoginId) => {
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/checkEvaluation?empno=${Emp_no}&evaluatedBy=${LoginId}&course=${Course_desc}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response, response.length);
                if (response.length > 0) {
                    alert('You Already Evaluate this Course')
                } else {
                    navigation.navigate('AcademicQuestions', {
                        empName:empName,
                        CourseName: Course_desc,
                        EmpNo: Emp_no,
                        LoginId: LoginId,
                    })
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Courses</Text>
            <FlatList style={{ padding: 7 }}
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return (<View>
                        {route.params.Type == "Academic" ? (
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#fff', backgroundColor: '#000', margin: 5, padding: 10, borderRadius: 10 }}
                                onPress={() => {
                                    // navigation.navigate('AcademicQuestions', {
                                    //     empName: route.params.empName,
                                    //     CourseName: item.Course_desc,
                                    //     EmpNo: item.Emp_no,
                                    //     LoginId: route.params.LoginId,
                                    // })
                                    checkAlreadyEvaluatedOrNot(route.params.empName,item.Course_desc,item.Emp_no,route.params.LoginId);
                                }
                                }
                            >
                                <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> {item.Course_desc}</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#fff', backgroundColor: '#000', margin: 5, padding: 10, borderRadius: 10 }}
                                onPress={() => navigation.navigate('TeacherEvaluationResult', {
                                    EmpNo: item.Emp_no,
                                    CourseName: item.Course_desc,
                                })}
                            >
                                <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}> {item.Course_desc}</Text>
                            </TouchableOpacity>
                        )

                        }
                    </View>
                    )
                }
                }
            />

        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerView: {
        alignSelf: 'center',
        width: '95%',
        backgroundColor: 'white',
        backgroundColor: '#eee',
        borderRadius: 20,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    txt: {
        width: "110%",
        backgroundColor: "#fffff4",
        margin: 20,
        padding: 10,
        fontSize: 25,
        textAlign: 'auto',
        //textAlign:'center',
        color: 'black',
        borderRadius: 10,
    },
    input: {
        flex: 1,
        fontSize: 25,
        marginLeft: 10,
        backgroundColor: 'white'
    },
    text: {
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
}
)

export default TeacherCourses;