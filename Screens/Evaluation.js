import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ToastAndroid } from 'react-native';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from "react-native-simple-radio-button";
const Evaluation = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [questionsData, setQuestionsData] = useState([]);
    const [copy, setCopy] = useState([]);
    var radio_props = [
        //radio button
        { label: "Excellent ", value: "Excellent", },
        { label: "Good", value: "Good" },
        { label: "Average", value: "Average" },
        { label: "Poor", value: "Poor" }

    ];
    useEffect(() => {
        var InsertApiURL = `http://192.168.1.104/EmpPerformanceApi/api/Student/getteacherbycourse?empno=${route.params.Emp_no}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                response.forEach(element => {
                    setTeacherName(element.Emp_firstname + " " + element.Emp_middle + " " + element.Emp_lastname);
                });
            })
            .catch((error) => {
                console.log(error)
            })

        //get all question from database
        var InsertApiURL = `http://192.168.1.104/EmpPerformanceApi/api/Admin/getQuestions`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setQuestionsData([]);
                response.forEach(element => {
                    setQuestionsData(data => [...data, {
                        Qid: element.Qid,
                        Question: element.Question,
                        Category: element.Category,
                        Selected: '',
                    }])
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const onChangeValue = (qid, itemSelected) => {
        console.log(qid, itemSelected);
        const newData = questionsData.map(item => {
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
        setQuestionsData(newData);
        setCopy(newData);
        // console.log(newData);
    }
    const detail = () => {
        questionsData.forEach(element => {
            if(element.Selected!==''){
                // console.log(route.params.Reg_no,element.Qid,route.params.Emp_no,route.params.Course ,element.Selected,teacherName);
                var InsertApiURL = "http://192.168.1.104/EmpPerformanceApi/api/Student/addStdEvaluation";
                var headers = {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                };
                var Data = {
                    Reg_No:route.params.Reg_no,
                    QuestionId:element.Qid,
                    Emp_No:route.params.Emp_no,
                    Course:route.params.Course,
                    Weight:element.Selected,
                    tName:teacherName,
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
                    if(response=="true"){
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
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}> {teacherName} </Text>

            <FlatList style={{ padding: 7 }}
                data={questionsData}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity style={styles.card} >
                        <Text style={{ fontSize: 20, color: '#eee' }}>Question# : {item.Qid}</Text>
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
                onPress={() => detail()}>
                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', color: '#fff' }}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Evaluation;
const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 8,
        marginBottom: 10,
        backgroundColor: '#f44336',
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
        height: 55,
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})