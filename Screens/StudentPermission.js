import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native';
const StudentPermission = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isFetched, setIsFetched] = useState(true);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#ddd' }}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Is Students Allows for Evaluation?</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
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
export default StudentPermission;
