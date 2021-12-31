import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const ChooseEvaluationType = ({ navigation,route }) => {
    console.log(route.params);
    return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <View style={styles.texttop}>
                    <Text style={styles.btnText}>Choose Evaluation Type</Text>
                </View>
                <TouchableOpacity style={styles.userbtn}
                    onPress={() => navigation.navigate('TeachersList',{Id:route.params.Id,Type:"Administrative"})}>
                    <Text style={styles.btnText}> Administrative </Text>
                </TouchableOpacity>
               <TouchableOpacity style={styles.userbtn}
                    onPress={() => navigation.navigate('TeachersList',{Id:route.params.Id,Type:"Academic"})}>
                    <Text style={styles.btnText}> Acedamic </Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    texttop: {
        backgroundColor: 'orange',
        width: '90%',
        height: '10%',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:15,
        marginBottom: 10,
    },
    userbtn: {
        backgroundColor: "#FFA07A",
        padding: 10,
       alignSelf:'center',
        marginTop: 20,
        width: "90%",
        fontFamily: "SemiBold",
        borderRadius: 15,
    },
    btnText: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: "fantasy",
        justifyContent: 'center',
        padding: 10,

    },
    innerView: {
        // flex:1,
        backgroundColor: '#00FFFF',
        borderRadius: 20,
        //  padding:20,
        //margin:70,
        marginBottom: 40,
        width: '80%',
        height: '80%',
    }
})
export default ChooseEvaluationType;