// Homescreen.js
import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
const TeacherEvaluationResult = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData([]);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/teacherEvaluationResult?courseName=${route.params.CourseName}&empNo=${route.params.EmpNo}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                let count = 1;
                response.forEach(element => {
                    setData(data => [...data,
                    {
                        Id: element.Id,
                        Reg_No: element.RegNo,
                        QuestionId: count++,
                        Emp_No: element.EmpNo,
                        Course: element.Course,
                        Weight: element.Weight,
                        tName: element.tName,
                    }
                    ])
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <ImageBackground source={require('../assets/Images/background.png')} resizeMode="cover" style={styles.container}>
            <View style={styles.innerView} >
                <FlatList style={{ padding: 7 }}
                    data={data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        return <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#000', padding: 10, }}>
                            <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center' }}>Question # {item.QuestionId}</Text>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={{flex:1.5,textAlign:'center',fontSize:20,fontWeight:'bold'}}>Reg No</Text>
                                <Text style={{flex:0.5,textAlign:'center',fontSize:20,fontWeight:'bold'}}> Weight </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center',flex:1.5,textAlign:'center' }}> {item.Reg_No}</Text>
                                <Text style={{ fontSize: 20, color: '#eee', textAlign: 'center',flex:0.5,textAlign:'center' }}> {item.Weight}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    }
                />
            </View>
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
        backgroundColor: '#EB984E',
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
export default TeacherEvaluationResult;