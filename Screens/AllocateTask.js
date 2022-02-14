import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, FlatList, ActivityIndicator, Modal, Pressable } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { Picker } from "@react-native-picker/picker";
var radio_props = [
    { label: "Partial", value: 0 },
    { label: "Incomplete", value: 1 },
    { label: "Complete ", value: 2 },
];
const AllocateTask = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState([]);
    const [selectedRole, setSelectedRole] = useState('Mid Exam Report');
    const [teachersList, setTeachersList] = useState([]);
    const [isFetchTeacher, setIsFetchTeacher] = useState(false);
    useEffect(() => {
        getAllTasks();
    }, [])
    const getAllTasks = () => {
        setData([]); setIsFetched(true);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/getAllTasks`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                response.forEach(element => {
                    setData(data => [...data, {
                        // Id: ,
                        EmpNo: element.EmpNo,
                        tName: element.tName,
                        Role: element.Role,
                        Status: element.Status,
                    }])
                });
                setIsFetched(false);
            })
            .catch((error) => {
                alert(error)
            })
    }
    const getTeachersList = () => {
        // setTeachersList([]);
        setIsFetchTeacher(true);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/getteachersList`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setSelectedTeacher(response[0].EmpNo);
                response.forEach(element => {
                    setTeachersList(data => [...data,
                    {
                        EmpNo: element.EmpNo.toString(),
                        tName: element.tName.toString(),
                    }
                    ])
                });
                setIsFetchTeacher(false);
            })
            .catch((error) => {
                setIsFetchTeacher(false);
                alert(error);
            })
    }

    const saveTask = () => {
        console.log(selectedTeacher, selectedRole);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/allocateTask`;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        var Data = {
            EmpNo: selectedTeacher,
            Role: selectedRole,
            Status: 0,
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
                if (response == "true")
                    alert("Task Allocated Successfully!");
                getAllTasks();
                setModalVisible(false);
            })
            .catch((error) => {
                alert(error);
            })
    }
    const onChangeValue = (empno, itemSelected) => {
        console.log(empno, itemSelected);
        const newData = data.map(item => {
            if (item.EmpNo == empno) {
                return {
                    ...item,
                    Status: itemSelected,
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

    const updateTaskStatus = (empno, status) => {
        // data.forEach(element => {
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Director/updateTaskStatus`;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        var Data = {
            EmpNo: empno,
            Status: status,
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
        // });
    }
    return (
        <View style={styles.container}>
            {
                isFetched == true ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                        // onRequestClose={() => { ToastAndroid.show("Please wait while downloading is completed.Thanks!", ToastAndroid.SHORT) }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalTitle}>Allocate Task to Teachers!</Text>
                                    <Text> Select Teacher </Text>
                                    {
                                        isFetchTeacher == true ? (
                                            <View style={[styles.horizontal]}>
                                                <ActivityIndicator size="large" color="red" />
                                            </View>
                                        ) : (
                                            <Picker
                                                selectedValue={selectedTeacher}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    console.log(itemValue),
                                                        setSelectedTeacher(itemValue)
                                                }
                                                }
                                                mode='dropdown'
                                            >
                                                {teachersList.map((item, key) => {
                                                    return <Picker.Item key={key} value={item.EmpNo} label={item.tName} />;
                                                    // console.log(item);
                                                })
                                                }
                                            </Picker>
                                        )
                                    }

                                    {/*---------------------------------------ROLE--------------------------------------------- */}
                                    <Text> Select Role </Text>
                                    <Picker
                                        selectedValue={selectedRole}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedRole(itemValue)
                                        }
                                        mode='dropdown'
                                    >
                                        <Picker.Item label="Mid Exam Report" value="Mid Exam Report" />
                                        <Picker.Item label="Final Exam Report" value="Final Exam Report" />
                                        <Picker.Item label="Class Activities Reports" value="Class Activities Reports" />
                                        <Picker.Item label="Overall Semester Report" value="Overall Semester Report" />
                                        <Picker.Item label="Project Assigned" value="Project Assigned" />
                                    </Picker>
                                    <View style={{ flexDirection: 'row-reverse' }}>
                                        <TouchableOpacity style={styles.actionButtons} onPress={() => saveTask()}>
                                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: '600' }}> Save </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButtons} onPress={() => setModalVisible(false)}>
                                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: '600' }}> Cancel </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <FlatList style={{ backgroundColor: '#888', height: '100%' }}
                            data={data}
                            keyExtractor={(item, index) => index}
                            renderItem={(item, index) =>
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.txt}>Teacher Id :  </Text>
                                        <Text style={[styles.txt, { fontWeight: 'normal', marginLeft: 20 }]}> {item.item.EmpNo}</Text>
                                    </View>
                                    <Text style={styles.txt}>Teacher Name :  </Text>
                                    <Text style={[styles.txt, { fontWeight: 'normal', marginLeft: 20 }]}> {item.item.tName}</Text>
                                    <Text style={styles.txt}>Assign Task :  </Text>
                                    <Text style={[styles.txt, { fontWeight: 'normal', marginLeft: 20 }]}> {item.item.Role}</Text>
                                    <RadioForm
                                        style={styles.radiostyle} //radio button
                                        // onChangeText={(text) => setgender(text)}
                                        radio_props={radio_props}
                                        initial={Number(item.item.Status)}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        buttonColor={"#2196f3"}
                                        // animation={true}
                                        onPress={(value) => {
                                            onChangeValue(item.item.EmpNo, value)
                                            // ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                                        }
                                        }
                                        buttonsize={20}
                                        buttonOuterSize={20}
                                        selectedButtonColor={"green"}
                                        selectedLabelColor={"red"}
                                        labelStyle={{ fontSize: 18, marginRight: 5 }} />
                                    <TouchableOpacity style={{ backgroundColor: '#000', borderRadius: 10, marginTop: 5 }}
                                        onPress={() => { updateTaskStatus(item.item.EmpNo, item.item.Status) }}>
                                        <Text style={[styles.btnText, { fontSize: 24, padding: 10 }]}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <TouchableOpacity style={styles.btn}
                            onPress={() => { setModalVisible(true), teachersList.length == 0 && getTeachersList() }}>
                            <Text style={styles.btnText}>+</Text>
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
        padding: 20,
        backgroundColor: 'pink',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    txt: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#000000',
        flex: 1, flexWrap: 'wrap'
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
        backgroundColor: 'transparent',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        width: '90%',
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "left",
        fontSize: 20,
        fontWeight: 'bold',
    },
    actionButtons: {
        backgroundColor: "blue",
        marginTop: 25,
        marginLeft: 5,
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    }

}
)
export default AllocateTask;