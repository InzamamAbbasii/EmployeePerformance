import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Teachers_Info = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    // console.log(route.params);
    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            console.log('The screen is focus..');
            getTeacherList();
        })
        return unsub;
    }, [])

    const getTeacherList = () => {
        setData([]); setIsFetched(true);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/getteachersList`;
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
                        Emp_firstname: element.Emp_firstname,
                        Emp_lastname: element.Emp_lastname,
                        Emp_middle: element.Emp_middle,
                        Dsgn_no: element.Dsgn_no,
                        Per_address: element.Per_address,
                        Per_city: element.Per_city,
                        Pr_address: element.Pr_address,
                        Pr_city: element.Pr_city,
                        Res_telno: element.Res_telno,
                        Emp_email: element.Emp_email,
                        Joining_date: element.Joining_date,
                        Resign_date: element.Resign_date,
                        Status: element.Status,
                        NIC: element.NIC,
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

    const deleteTeacher=(empno)=>{
        console.log(empno);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/deleteTeacher?empno=${empno}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                alert(response)
                getTeacherList();
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
                            return (
                                <View style={styles.card} >
                                    <TouchableOpacity >
                                        <Text style={{ fontSize: 20, color: '#000', textAlign: 'left' }}>EmpNo : {item.Emp_no}  </Text>
                                        <Text style={{ fontSize: 20, color: '#000', textAlign: 'left' }}>Name : {item.Emp_firstname} {item.Emp_middle} {item.Emp_lastname}  </Text>
                                        <Text style={{ fontSize: 20, color: '#000', textAlign: 'left' }}>Status : {item.Status}  </Text>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row',marginTop:15}} >
                                        <TouchableOpacity  onPress={()=>deleteTeacher(item.Emp_no)}
                                        style={{backgroundColor:'#000',height:50,flex:1,justifyContent:'center',alignItems:'center',borderRadius:10,margin:10}}>
                                            <Text style={{fontSize:20,color:'#fff',fontWeight:'600'}}> Delete </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            )
                        }
                        }
                    />
                )
            }
            <TouchableOpacity onPress={() => navigation.navigate('AddOrEditTeacher')}
                style={{ zIndex: 1, height: 60, width: 60, borderRadius: 60, backgroundColor: 'red', backgroundColor: 'red', position: 'absolute', bottom: '5%', right: '5%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="add" color={'#fff'} size={30} />
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
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    card: {
        borderRadius: 10,
        width: '99%',
        alignSelf: 'center',
        justifyContent: 'center',
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
export default Teachers_Info;
