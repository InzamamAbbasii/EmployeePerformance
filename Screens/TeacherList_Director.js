import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
const TeachersList_Director = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            console.log('The screen is focus..');
            getTeachersList();
        })
        return unsub;
    }, [])

    const getTeachersList = () => {
        console.log(route.params.LoginId,route.params.EvaluationType)
        setData([]); setIsFetched(true);
        // var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/getteachersList?empno=${route.params.Id}`;
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/getNonEvalutatedTeachersList?empno=${route.params.LoginId}&evalType=${route.params.EvaluationType}`;
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
                        EmpNo: element.EmpNo,
                        tName: element.tName,
                    }
                    ])
                });
                setIsFetched(false);
            })
            .catch((error) => {
                setIsFetched(false);
                alert(error);
            })
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#ddd' }}>
            {
                isFetched == true ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                ) : (
                    <FlatList style={{ padding: 7, width: '100%' }} showsVerticalScrollIndicator={false}
                        data={data}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (<View>
                                <TouchableOpacity style={styles.card} onPress={() => {
                                    route.params.EvaluationType=='Administration'&&(
                                        navigation.navigate('AdministrationEvaluation_Director', {
                                            // LoginId: route.params.Id,
                                            // EmpNo: item.EmpNo,
                                            // empName: item.tName,
                                            LoginId: route.params.LoginId,
                                            EmpNo: item.EmpNo,
                                            TeacherName: item.tName,
                                            EvaluationType: 'Administration'
                                        })
                                    )
                                    route.params.EvaluationType=='Project'&&(
                                        navigation.navigate('ProjectEvaluation_Director', {
                                            // LoginId: route.params.Id,
                                            // EmpNo: item.EmpNo,
                                            // empName: item.tName,
                                            LoginId: route.params.LoginId,
                                            EmpNo: item.EmpNo,
                                            TeacherName: item.tName,
                                            EvaluationType: 'Administration'
                                        })
                                    )
                                }}>
                                    <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.EmpNo}  </Text>
                                    <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.tName}  </Text>
                                </TouchableOpacity>
                            </View>
                            )
                        }
                        }
                    />
                )
            }
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
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    card: {
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 100,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#1bb',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 2.32,
        shadowRadius: 20.46,
        elevation: 5,
    },
})
export default TeachersList_Director;
