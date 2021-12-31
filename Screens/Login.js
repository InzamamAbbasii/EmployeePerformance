//Login
//import * as React  from 'react';
import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text, View,
  TextInput,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 15000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

const Login = ({ navigation }) => {
  let [name, setName] = React.useState('');
  let [password, setPassword] = React.useState('');
  let [isVisible, setIsVisible] = React.useState(true);
  const LoginF = () => {
    if (name.length == 0 || password.length == 0) {
      alert("Please Enter Your Credentials!");
    } else if (name.toLocaleLowerCase() == 'admin' && password == '123') {
      navigation.navigate('AdminDashboard');
    } else if (name.toLocaleLowerCase() == 'director' && password == '123') {
      navigation.navigate('DirectorDashboard', { empNo: name });
    } else {
      var InsertApiURL = `http://${ip}/EmpPerformanceApi/api/User/Login?name=${name}&pass=${password}`;
      fetch(InsertApiURL,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.includes('teacher')) {
            navigation.navigate('TeacherDashBoard', { empNo: name });
          }else if (response.includes('student')) {
            navigation.navigate('StudentCourses', { regno: name });
          }
          else {
            alert(response);
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
  return (
    <View style={styles.container}>

      <View style={styles.image}>
        <Image source={require('../assets/Images/emp.png')} />
      </View>
      <FadeInView>
        <Text style={styles.welcomeTxt}>EMPLOYEES PERFORMANCE APPRAISAL</Text>
      </FadeInView>

      <View style={styles.iconstyle}>
        <Feather name="user" size={30} />
        <TextInput style={styles.input}
          placeholder="User Name"
          onChangeText={(username) => setName(username)}
          value={name}
        />
      </View>
      <View style={styles.iconstyle}>
        <Feather name="lock" size={30} />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          secureTextEntry={isVisible}
        />
        <Feather
          name={isVisible ? "eye-off" : "eye"}
          size={30}
          onPress={() => setIsVisible(!isVisible)}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.userbtn}
          onPress={() => LoginF()}>
          <Text style={styles.btnText}>
            Login
          </Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.userbtn}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.btnText}>SignUp</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.belowtxtView}>
        <Text style={styles.bottomText}>Don't have an account.!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.logintxt}>SignUp</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4EE2EC',
    margin: 10,
    borderRadius: 10
  },
  text: {
    fontSize: '25',
    color: '#333'
  },
  image: {
    //padding:10,
    //width: 100,
    //height: 100,
    //marginVertical:10
  },
  iconstyle: {
    flexDirection: 'row',
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 10,
    height: 60,
    width: '90%',
    marginBottom: 20,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: 'center',

  },
  welcomeTxt: {
    fontSize: 45,
    textAlign: 'center',
    margin: 20,
    color: "#954535",
    fontFamily: "IndieFlower-Regular"

  },
  input: {
    width: "75%",
    fontSize: 25,
    marginLeft: 10,

  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },
  userbtn: {
    backgroundColor: "#FFA07A",
    padding: 10,
    width: "40%",
    fontFamily: "SemiBold",
    borderRadius: 25,
  },
  btnText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: "fantasy"
  },

  logintxt: {
    fontSize: 20,
    fontFamily: "SemiBold",
    color: 'blue',
    marginLeft: 5,
  },
  belowtxtView: {
    flexDirection: 'row',
    marginTop: 30,
  },
  bottomText: {
    fontSize: 20,
    marginLeft: '20%',
  },

}
)
export default Login;