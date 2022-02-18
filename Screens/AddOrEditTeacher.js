import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const AddOrEditTeacher = ({ navigation, route }) => {

    const [EmpNo, setEmpNo] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [MiddleName, setMiddleName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Status, setStatus] = useState('');


    const addTeacher = () => {
        if (EmpNo.length == 0) {
            alert('Please Enter EmpNo')
        } else if (FirstName.length == 0) {
            alert('Please Enter FirstNAme')
        } else {
            console.log(EmpNo, FirstName, MiddleName, LastName, Status);
            var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/AddTeacher`;
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            var Data = {
                Emp_No: EmpNo,
                Emp_firstname: FirstName,
                Emp_middle: MiddleName,
                Emp_lastname: LastName,
                Status: Status,
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
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#ddd' }}>

            <TextInput style={styles.textInput}
                value={EmpNo}
                placeholder='Enter Empno'
                onChangeText={(text) => setEmpNo(text)}
            />

            <TextInput style={styles.textInput}
                value={FirstName}
                placeholder='Enter FirstName'
                onChangeText={(text) => setFirstName(text)}
            />

            <TextInput style={styles.textInput}
                value={MiddleName}
                placeholder='Enter Middle Name'
                onChangeText={(text) => setMiddleName(text)}
            />


            <TextInput style={styles.textInput}
                value={LastName}
                placeholder='Enter Last Name'
                onChangeText={(text) => setLastName(text)}
            />

            <TextInput style={styles.textInput}
                value={Status}
                placeholder='Enter Status'
                onChangeText={(text) => setStatus(text)}
            />

            <TouchableOpacity onPress={() => addTeacher()}
                style={{ backgroundColor: '#000', height: 50, width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10 }}>
                <Text style={{ fontSize: 20, color: '#fff', fontWeight: '600' }}> Save </Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd'
    },
    textInput: {
        borderWidth: 2,
        backgroundColor: '#fff',
        width: '90%',
        paddingLeft: 10,
        color: '#000',
        marginBottom: 10
    }
})
export default AddOrEditTeacher;
