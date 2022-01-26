import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
    ActivityIndicator
} from "react-native";
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from "react-native-simple-radio-button";
var radio_props = [
    //radio button
    { label: "Excellent ", value: "Excellent", },
    { label: "Good", value: "Good" },
    { label: "Average", value: "Average" },
    { label: "Poor", value: "Poor" }
];
const AdministrationEvaluation_Director = ({ navigation, route }) => {
    console.log(route.params);
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    useEffect(() => {
        setData([]);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/getAdministraionQuestions`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                let count = 1;
                console.log(response)
                if (response.forEach != undefined) {
                    response.forEach(element => {
                        setData(data => [...data, {
                            Qid: count++,
                            Question: element.Question1,
                            Category: element.Category,
                            Selected: '',
                        }])
                    });
                } else {
                    alert('something went wrong...')
                }
                setIsFetched(false);
            })
            .catch((error) => {
                setIsFetched(false);
                alert(error)
            })
    }, [])
    const onChangeValue = (qid, itemSelected) => {
        console.log(qid, itemSelected);
        const newData = data.map(item => {
            if (item.Qid == qid) {
                return {
                    ...item,
                    Selected: itemSelected,
                }
            } else {
                return {
                    ...item,
                }
            }
        })
        setData(newData);
        // console.log(newData);
    }
    const saveEvaluation = () => {
        console.log('....');
        data.forEach(element => {
            if (element.Selected !== '') {
                console.log(route.params.TeacherId,element.Qid,element.Question,element.Category,route.params.CourseName,element.Selected,route.params.TeacherName,route.params.LoginId);
                // console.log(route.params.Reg_no,element.Qid,route.params.Emp_no,route.params.Course ,element.Selected,teacherName);
                var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Evaluation/addAdministrationEvaluation`;
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };
                var Data = {
                    QuestionId: element.Qid,
                    Question: element.Question,
                    QCategory: element.Category,
                    Weight: element.Selected,
                    Emp_No: route.params.TeacherId,
                    Evaluation_on: route.params.TeacherName,
                    Evaluated_By: route.params.LoginId,
                    Role:'Director'
                }
                fetch(InsertApiURL,
                    {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(Data)
                    }
                )
                    .then((response) => response.json())
                    .then((response) => {
                        console.log(response);
                        if (response == "true") {
                            alert("Data Saved Successfully!")
                        }
                        // ToastAndroid.show(response, ToastAndroid.LONG);
                    })
                    .catch((error) => {
                        let errorMsg = error;
                        alert(error);
                        // ToastAndroid.show(errorMsg, ToastAndroid.LONG);
                    })
            }
        });
    }
    return (
        <View style={styles.container}>
            {
                isFetched == true ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 24, fontFamily: "ArchitectsDaughter-Regular", textAlign: 'center' }}> {route.params.TeacherName} </Text>
                        <FlatList style={{ padding: 7, width: '100%' }} showsVerticalScrollIndicator={false}
                            data={data}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity style={styles.card} >
                                    <Text style={{ fontSize: 20, color: '#eee' }}>Question# {item.Qid}</Text>
                                    <Text style={{ fontSize: 20, color: '#eee' }}>{item.Question}</Text>
                                    <RadioForm
                                        style={styles.radiostyle} //radio button
                                        onChangeText={(text) => setgender(text)}
                                        radio_props={radio_props}
                                        initial={-1}
                                        formHorizontal={false}
                                        labelHorizontal={true}
                                        buttonColor={"#2196f3"}
                                        animation={true}
                                        onPress={(value) => {
                                            onChangeValue(item.Qid, value)
                                            // ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                                        }
                                        }
                                        buttonsize={5}
                                        buttonOuterSize={30}
                                        selectedButtonColor={"green"}
                                        selectedLabelColor={"#fff"}
                                        labelStyle={{ fontSize: 20 }} />
                                </TouchableOpacity>
                            }
                            }
                        />
                        <TouchableOpacity style={styles.btnTouchable}
                        onPress={()=>saveEvaluation()}>
                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', color: '#fff' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
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
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#1bb',
        shadowColor: "#db6363",
        shadowOffset: {
            width: 10,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    question: {
        fontSize: 25,
        marginBottom: 5,
        fontStyle: 'italic',
        color: '#000000',
    },
    options: {
        fontSize: 25,
        color: '#0000FF',
    },
    btn: {
        backgroundColor: '#008080',
        height: 60,
        width: 60,
        position: 'absolute',
        top: '88%',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90
    },
    btnText: {
        fontSize: 40,
        color: 'white',
        alignSelf: 'center',
    },
    radiostyle: {
        paddingLeft: 5,
        marginTop: 10,
    },
    btnTouchable: {
        backgroundColor: '#f44336',
        borderWidth: 1,
        borderColor: '#eee',
        height: 55,
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center'
    }
}
)
export default AdministrationEvaluation_Director;