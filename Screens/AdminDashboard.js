import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, TouchableOpacity, ImageBackground, Text, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Switch } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
const AdminDashboard = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [allowAll, setAllowAll] = useState(false);
  const [BED, setBED] = useState(false);
  const [BBA, setBBA] = useState(false);
  const [BCE, setBCE] = useState(false);
  const [BCS, setBCS] = useState(false);
  const [BIT, setBIT] = useState(false);
  const [BSCS, setBSCS] = useState(false);
  const [MBA, setMBA] = useState(false);
  const [MMC, setMMC] = useState(false);
  const [MCS, setMCS] = useState(false);
  const [MIT, setMIT] = useState(false);
  const [MS, setMS] = useState(false);
  const [MSCS, setMSCS] = useState(false);

  const onToggleSwitch = () => updateStudentPermission();
  const updateStudentPermission = () => {
    setIsSwitchOn(!isSwitchOn)
    console.log('...', isSwitchOn);
    // var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/setStudentEvaluationPermission?permission=${!isSwitchOn}`;
    // fetch(InsertApiURL,
    //   {
    //     method: 'GET',
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((response) => {
    //     if (response == 'true') alert('Saved Successfully!')
    //   })
    //   .catch((error) => {
    //     alert(error)
    //   })

    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/AddStudentPermission`;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      BED: !isSwitchOn,
      BBA: !isSwitchOn,
      BCE: !isSwitchOn,
      BCS: !isSwitchOn,
      BIT: !isSwitchOn,
      BSCS: !isSwitchOn,
      MBA: !isSwitchOn,
      MMC: !isSwitchOn,
      MCS: !isSwitchOn,
      MIT: !isSwitchOn,
      MS: !isSwitchOn,
      MSCS: !isSwitchOn,
      AllowAll: !isSwitchOn,
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
        if (response == "true")
          alert("Data Saved Successfully!")
      })
      .catch((error) => { alert(error) })

  }
  useEffect(() => {
    GetStudentPermission();
    // var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/getStudentEvaluationPermission`;
    // fetch(InsertApiURL,
    //   {
    //     method: 'GET',
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log('response ::: ', response);
    //     if (response == 'true')
    //       setIsSwitchOn(true);
    //     else
    //       setIsSwitchOn(false);
    //   })
    //   .catch((error) => {
    //     alert(error)
    //   })
  }, []);

  const allowStudents = () => {
    console.log(BED, BBA, BCE, BCS, BIT, BSCS, MBA, MMC, MCS, MIT, MS, MSCS);

    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/AddStudentPermission`;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data = {
      BED: BED,
      BBA: BBA,
      BCE: BCE,
      BCS: BIT,
      BIT: BIT,
      BSCS: BSCS,
      MBA: MBA,
      MMC: MMC,
      MCS: MCS,
      MIT: MIT,
      MS: MS,
      MSCS: MSCS,
      AllowAll:allowAll,
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
        if (response == "true")
          alert("Data Saved Successfully!")
      })
      .catch((error) => { alert(error) })
  }

  const GetStudentPermission = () => {
    var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/Admin/GetStudentPermission`;
    fetch(InsertApiURL,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log('response ............. ', response);
        if (response === 'no') {
          console.log('if');
          // setPermission('true');
        } else {
          console.log(!!Boolean(response.AllowAll));
          // setIsSwitchOn(Boolean(response.AllowAll))
          // setAllowAll(Boolean(response.))
          response.AllowAll == 'true'?setIsSwitchOn(true):setIsSwitchOn(false)
          response.AllowAll == 'true'?setAllowAll(true):setAllowAll(false)
          response.BED == 'true'?setBED(true):setBED(false)
          response.BBA == 'true'?setBBA(true):setBBA(false)
          response.BCE == 'true'?setBCE(true):setBCE(false)
          response.BCS == 'true'?setBCS(true):setBCS(false)
          response.BIT == 'true'?setBIT(true):setBIT(false)
          response.BSCS == 'true'?setBSCS(true):setBSCS(false)
          response.MBA == 'true'?setMBA(true):setMBA(false)
          response.MMC == 'true'?setMMC(true):setMMC(false)
          response.MCS== 'true'?setMCS(true):setMCS(false)
          response.MIT== 'true'?setMIT(true):setMIT(false)
          response.MS== 'true'?setMS(true):setMS(false)
          response.MSCS== 'true'?setMSCS(true):setMSCS(false)
          // setIsSwitchOn(Boolean(response.AllowAll))
          // setAllowAll(Boolean(response.AllowAll))
          // setBED(Boolean(response.BED));
          // setBBA(Boolean(response.BBA));
          // setBCE(Boolean(response.BCE));
          // setBCS(Boolean(response.BCS));
          // setBIT(Boolean(response.BIT));
          // setBSCS(Boolean(response.BSCS));
          // setMBA(Boolean(response.MBA));
          // setMMC(Boolean(response.MMC));
          // setMCS(Boolean(response.MCS));
          // setMIT(Boolean(response.MIT));
          // setMS(Boolean(response.MS));
          // setMSCS(Boolean(response.MSCS));
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <ImageBackground source={require('../assets/Images/admnImg.jpg')} resizeMode="cover" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Question')}
            style={styles.button}>
            <Text style={styles.buttonText}>Add Question</Text>
            <Feather name="plus-square" size={25} color="#fff" />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('AdminScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>Appraisal</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('AdminScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>Evaluation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Question')}
          style={styles.button}>
          <Text style={styles.buttonText}>Questionnaire</Text>
        </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}
            style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
            <Feather name="settings" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity disabled={true}
            // onPress={() => navigation.navigate('StudentPermission')}
            style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Is Students Allows for Evaluation?</Text>
            <Switch value={isSwitchOn} color={'red'} onValueChange={onToggleSwitch} />
          </TouchableOpacity>


          {/* ---------------------------------for task START --------------------------- */}


          <TouchableOpacity onPress={() => navigation.navigate('Teachers_Info')}
            style={styles.button}>
            <Text style={styles.buttonText}> Teachers </Text>
            <Feather name="plus-square" size={25} color="#fff" />
          </TouchableOpacity>


          <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 8, alignSelf: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 10 }}> Allow Students for Evaluation?</Text>

            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={allowAll}
                  onValueChange={(newValue) => {
                    setAllowAll(newValue)
                    setBED(newValue);
                    setBBA(newValue);
                    setBCE(newValue);
                    setBCS(newValue);
                    setBIT(newValue);
                    setBSCS(newValue);
                    setMBA(newValue);
                    setMMC(newValue);
                    setMCS(newValue);
                    setMIT(newValue);
                    setMS(newValue);
                    setMSCS(newValue);
                  }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>Allow All</Text>
              </View>

            </View>


            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={BED}
                  onValueChange={(newValue) => setBED(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>B.Ed</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={BBA}
                  onValueChange={(newValue) => setBBA(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>BBA</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={BCE}
                  onValueChange={(newValue) => setBCE(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>BCE</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={BCS}
                  onValueChange={(newValue) => setBCS(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>BCS</Text>
              </View>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={BIT}
                  onValueChange={(newValue) => setBIT(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>BIT</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={BSCS}
                  onValueChange={(newValue) => setBSCS(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>BSCS</Text>
              </View>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={MBA}
                  onValueChange={(newValue) => setMBA(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>MBA</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={MMC}
                  onValueChange={(newValue) => setMMC(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>MMC</Text>
              </View>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={MCS}
                  onValueChange={(newValue) => setMCS(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>MCS</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={MIT}
                  onValueChange={(newValue) => setMIT(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>MIT</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={MS}
                  onValueChange={(newValue) => setMS(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>MS</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <CheckBox
                  disabled={false}
                  value={MSCS}
                  onValueChange={(newValue) => setMSCS(newValue)}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>MS(CS)</Text>
              </View>

            </View>

            <TouchableOpacity onPress={() => allowStudents()}
              style={{
                backgroundColor: 'red', height: 50, borderRadius: 10, marginVertical: 10,
                justifyContent: 'center', alignItems: 'center'
              }}>
              <Text style={{ fontSize: 20, color: '#fff', fontWeight: '800' }}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* ---------------------------------for task END --------------------------- */}

        </View>
      </ScrollView>
    </ImageBackground>
  )
};
const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    padding: 10,

  },
  button: {
    elevation: 80,
    backgroundColor: "#009688",
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFD700",
    alignSelf: 'center',
    // alignContent: 'center',
    fontWeight: "bold",
    fontStyle: 'italic',
    textTransform: "uppercase",
    marginBottom: 10
  },
  // bottomtab: {
  //   marginTop: '40%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   width: '100%',
  //   padding: 5,
  //   alignItems: 'stretch'
  // },
  icontxt: {
    fontSize: 25,
    color: 'black',
    alignSelf: 'flex-end',
  },
  // iconstyle: {
  //   paddingRight: 10,
  //   fontFamily: "SemiBold",
  // }
});
export default AdminDashboard;