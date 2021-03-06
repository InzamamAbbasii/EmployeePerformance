import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
const TeachersList = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    // console.log(route.params);
    useEffect(() => {
        const unsub  = navigation.addListener('focus',()=>{
            console.log('The screen is focus..');
            if(route.params.Type!='Academic'){
                getNonEvalutatedTeachersList();
            }else{
                getTeacherList();
            }
        })
        return unsub;
      }, [])
  
      const getNonEvalutatedTeachersList = () => {
          setData([]);setIsFetched(true);
          // var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/getteachersList?empno=${route.params.Id}`;
          var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/getNonEvalutatedTeachersList?empno=${route.params.Id}&evalType=${route.params.Type}`;
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
      const getTeacherList = () => {
        setData([]);setIsFetched(true);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Teacher/getteachersList?empno=${route.params.Id}`;
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
                                {route.params.Type == "Academic" ? (
                                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherCourses', { LoginId: route.params.Id, Emp_No: item.EmpNo, empName: item.tName, Type: route.params.Type })}>
                                        <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.EmpNo}  </Text>
                                        <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.tName}  </Text>
                                    </TouchableOpacity>
                                ) : (
                                    route.params.Role == "Director" ? (//if director login
                                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ChooseEvaluationType_Director', { LoginId: route.params.Id, EmpNo: item.EmpNo, empName: item.tName })}>
                                            <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.EmpNo}  </Text>
                                            <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.tName}  </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdministrativeQuestions', { LoginId: route.params.Id, EmpNo: item.EmpNo, empName: item.tName })}>
                                            <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.EmpNo}  </Text>
                                            <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>{item.tName}  </Text>
                                        </TouchableOpacity>
                                    )
                                )
                                }
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
export default TeachersList;
