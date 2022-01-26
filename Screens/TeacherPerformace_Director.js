// Homescreen.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ToastAndroid, ScrollView, Dimensions, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import RadioForm from "react-native-simple-radio-button";

const TeacherPerformace_Director = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    const [average, setAverage] = useState(0);
    const [academic, setAcademic] = useState(0);
    const [administrationRatio, setAdministrationRatio] = useState(0);
    const [projectRatio, setProjectRatio] = useState(0);
    const [empName, setEmpName] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('All');
    var radio_props = [
        { label: "All", value: "All", },
        { label: "CS", value: "CS" },
        { label: "Management", value: "Management" },
    ];
    useEffect(() => {
        setData([]);
        var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Evaluation/getEvaluatedTeachers?id=${route.params.Id}`;
        fetch(InsertApiURL,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((response) => {
                response.forEach(element => {
                    //getting performace ratio...
                    var InsertApiURL1 = `http://${ip}/EmpPerformanceApi/api/Evaluation/getEvaluationResult1?empNo=${element.Emp_No}&staff=${selectedStaff}`;
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
                                Evaluation_on: element.Evaluation_on,
                                Evaluation_By: element.Evaluation_By,
                                Academic: response.Academic,
                                Administration: response.Administration,
                                Project: response.Project,
                                Average: response.Average,
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
    }, [selectedStaff])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            {
                isFetched == true ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <View style={{ backgroundColor: '#999', alignItems: 'center', padding: 10 }}>
                            <RadioForm
                                //radio button
                                radio_props={radio_props}
                                initial={0}
                                formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={"#2196f3"}
                                // animation={true}
                                onPress={(value) => { console.log(value); setSelectedStaff(value) }}
                                buttonsize={20}
                                buttonOuterSize={30}
                                selectedButtonColor={"green"}
                                selectedLabelColor={"green"}
                                labelStyle={{ fontSize: 20, marginRight: 10 }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                contentContainerStyle={{ paddingBottom: 20 }}
                                data={data}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => {
                                    return <TouchableOpacity style={{ backgroundColor: '#038f7e', borderRadius: 10, marginBottom: 10, padding: 10,width:'95%',alignSelf:'center',alignContent:'center' }}>
                                        <Text style={{ fontSize: 23, color: '#eee', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center' }}> {item.Evaluation_on}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Performace Ratio : </Text>
                                        <View>
                                            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Academic : {((item.Academic / (item.Academic + item.Administration + item.Project)) * 100).toFixed(2)}%</Text>
                                            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Administration : {((item.Administration / (item.Academic + item.Administration + item.Project)) * 100).toFixed(2)}%</Text>
                                            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Project : {((item.Project / (item.Academic + item.Administration + item.Project)) * 100).toFixed(2)}%</Text>
                                            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Average : {((((item.Academic / (item.Academic + item.Administration + item.Project)) * 100) + ((item.Administration / (item.Academic + item.Administration + item.Project)) * 100) + ((item.Project / (item.Academic + item.Administration + item.Project)) * 100)) / 3).toFixed(2)}%</Text>
                                        </View>
                                        <View>
                                            <BarChart
                                                data={{
                                                    labels:
                                                        ['Academic', 'Adm', 'Project', 'Average'],
                                                    datasets: [
                                                        {
                                                            data: [((item.Academic / (item.Academic + item.Administration + item.Project)) * 100).toFixed(2), ((item.Administration / (item.Academic + item.Administration + item.Project)) * 100).toFixed(2), ((item.Project / (item.Academic + item.Administration + item.Project)) * 100).toFixed(2), ((((item.Academic / (item.Academic + item.Administration + item.Project)) * 100) + ((item.Administration / (item.Academic + item.Administration + item.Project)) * 100) + ((item.Project / (item.Academic + item.Administration + item.Project)) * 100)) / 3).toFixed(2)],
                                                        },
                                                    ],
                                                }}
                                                width={Dimensions.get('window').width - 50}
                                                // width={280}
                                                height={220}
                                                // yAxisLabel={'Rs'}
                                                chartConfig={{
                                                    backgroundColor: '#1cc910',
                                                    backgroundGradientFrom: '#eff3ff',
                                                    backgroundGradientTo: '#efefef',
                                                    decimalPlaces: 2,
                                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                    style: {
                                                        borderRadius: 16,
                                                    },
                                                }}
                                                style={{
                                                    marginVertical: 8,
                                                    borderRadius: 16,
                                                    alignSelf:'center'
                                                }}
                                            />
                                        </View>
                                        {/* <View style={{alignItems:'center'}}>
                                        <Pie
                                            radius={80}
                                            sections={[
                                                {
                                                    percentage: (item.Academic/(item.Academic+item.Administration+item.Project))*100,
                                                    color: '#C70039',
                                                },
                                                {
                                                    percentage: (item.Administration/(item.Academic+item.Administration+item.Project))*100,
                                                    color: '#44CD40',
                                                },
                                                {
                                                    percentage: (item.Project/(item.Academic+item.Administration+item.Project))*100,
                                                    color: '#404FCD',
                                                },
                                            ]}
                                            strokeCap={'butt'}
                                        />
                                    </View> */}
                                    </TouchableOpacity>
                                }
                                }
                            />
                        </View>
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