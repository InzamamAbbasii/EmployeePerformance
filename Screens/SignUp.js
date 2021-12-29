import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  TouchableOpacityBase,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { Picker } from "@react-native-picker/picker";
import Feather from "react-native-vector-icons/Feather";
import Login from "./Login";
var radio_props = [
  //radio button
  { label: "Male ", value: "Male" },
  { label: "Female", value: "Female" },
];
const SignUp = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = React.useState("");
  let [name, setName] = React.useState("");
  let [Email, setEmail] = React.useState("");
  let [gender, setgender] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [isVisible, setIsVisible] = React.useState(true); //password field visible func.
  let [confirmPassword, setconfirmPassword] = React.useState("");
  const SignFun = () => {
    if (
      name.length == 0 ||
      password.length == 0 ||
      Email.length == 0 ||
      confirmPassword.length == 0
    ) {
      alert("Please Enter the data in Required Fields!");
    }
    if (password != confirmPassword) {
      alert("Password and Confirm Password must same!");
    } else {
      var InsertApiURL =
        `http://${ip}/EmpPerformanceApi/api/User/SignUp`;
      var headers = {
        //api connection
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      var Data = {
        role: selectedRole,
        username: name,
       // email: Email,
        password: password,
        confirmPassword: confirmPassword,
      };
      console.log(name, password, gender, selectedRole);

      fetch(InsertApiURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          setName(""); //use for empty the text field
          setEmail("");
          setPassword("");
          setconfirmPassword("");
       //   ToastAndroid.show(response, ToastAndroid.LONG);
          console.log(response);
        })
        .catch((error) => {
          let errorMsg = error;
          ToastAndroid.show(errorMsg, ToastAndroid.LONG);
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrations</Text>
      <View style={styles.iconstyle}>
        <Feather name="user" size={30} />
        <TextInput
          style={styles.Textinput}
          placeholder="Your Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.iconstyle}>
        <Feather name="mail" size={30} />
        <TextInput
          style={styles.Textinput}
          placeholder="Enter Email"
          onChangeText={(text) => setEmail(text)}
          value={Email}
        />
      </View>

      <Text style={{ fontSize: 25, fontFamily: "SemiBold", color: "#000000" }}>
        {" "}
        Gender
      </Text>
      <RadioForm
        style={styles.radiostyle} //radio button
        onChangeText={(text) => setgender(text)}
        radio_props={radio_props}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={"#2196f3"}
        animation={true}
        onPress={(value) => {
          ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
        }}
        buttonsize={20}
        buttonOuterSize={30}
        selectedButtonColor={"green"}
        selectedLabelColor={"red"}
        labelStyle={{ fontSize: 20 }}
      />
      <View style={styles.iconstyle}>
        <Feather name="lock" size={30} />
        <TextInput
          style={styles.Textinput}
          placeholder="Enter password"
          secureTextEntry={isVisible}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Feather
          name={isVisible ? "eye-off" : "eye"}
          size={25}
          onPress={() => setIsVisible(!isVisible)}
        />
      </View>
      <View style={styles.iconstyle}>
        <Feather name="lock" size={30} />
        <TextInput
          style={styles.Textinput}
          placeholder="Confirm password"
          secureTextEntry={isVisible}
          onChangeText={(text) => setconfirmPassword(text)}
          value={confirmPassword}
        />
        <Feather 
         name={isVisible ? "eye-off" : "eye" }
         size={25} 
         onPress={() => setIsVisible(!isVisible)} //show-hide password field by pressing eye-icon
         />
      </View>
      <View style={styles.viewPicker}>
        <Picker
          style={styles.Picker} //Drop Down ,Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
        >
          <Picker.Item label="Select a Role" value="-1" />
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="Teacher" value="teacher" />
          <Picker.Item label="Student" value="student" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.userbtn} onPress={() => SignFun()}>
        <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.belowtxtView}>
          <Text style={styles.bottomText}>Already have an account.?</Text>
        <TouchableOpacity 
          onPress={() =>navigation.navigate('Login')}>
            <Text style={styles.logintxt}>Login</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
                //styles
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9FE2BF",
    padding: 20,
    margin:5,
    borderRadius:10
     },
  header: {
    fontSize: 40,
    fontFamily: "IndieFlower-Regular",
    color: "#000000",
    paddingBottom: 5,
    marginBottom: 20,
    borderBottomWidth:1,
  },
  bottomText:{
   fontSize: 20,
   marginLeft:'26%',
    },
  Textinput: {
    width: "75%",
    fontSize: 25,
    marginLeft: 10,
  },
  logintxt:{
    //textAlign:'center',
    fontSize:20,
    fontFamily: "SemiBold",
    color:'#0000FF',
    marginLeft:5,
  },
  belowtxtView:{
    flexDirection:'row',
  },
  userbtn: {
    backgroundColor: "#FFA07A",
    padding: 10,
    marginLeft:20,
    width: "90%",
    fontFamily: "SemiBold",
    borderRadius: 25,
    marginBottom:20,  
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "fantasy",
  },
  iconstyle: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingLeft: 20,
    height: 60,
    paddingRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  radiostyle: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  Picker: {
    width: "90%",
    height: 20,
    borderWidth: 2,
    borderRadius: 25,
    color: "#f4511e",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  viewPicker: {
    width: "95%",
    height: 80,
    borderWidth: 2,
    borderRadius: 25,
    color: "#f4511e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 10,
    backgroundColor: "#FFFFFF",
  },
}
);
export default SignUp;