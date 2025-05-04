import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    
    
    const handleLoginScreen = async () => {
        setMessage("");
        setLoading(true);

        try{
            console.log("Sending Login request with ",{userName,password})

            const res = await axios.post('http://192.168.1.113:5000/api/users/login',{
                username:userName,
                password,
            });

            console.log("API Response:", res.data);

            const token = res.data.token;

            // You can also navigate to the profile screen or home screen after successful login 
            setMessage(" login successfull ");
            
            // Pass token if needed
            navigation.navigate('Profile',{ token });

        }catch(err){
            console.error("Login error",err);
            setMessage(err.response ?.data?.message || 'Something went wrong');

        }finally{
            setLoading(false);
        }
    };

   
  return (
    <View style={styles.Container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
            style={styles.Input}
            placeholder='Username'
            onChangeText={setuserName}
            value={userName}
            autoCapitalize='none'
        />
        <TextInput
            style={styles.Input}
            placeholder='Password'
            onChangeText={setPassword}
            value={password}
            secureTextEntry
        />

        {/* Login Button with Loading State */}
        <View style={styles.buttonContainer}>
            <Button title={loading ? 'Logging In... ' : 'Login'} onPress={handleLoginScreen} disabled={loading} />
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        { loading && <ActivityIndicator size={'large'} color='#007BFF' style={styles.loadingIndicator}/> }
    </View>
  );
};

const styles = StyleSheet.create({
    Container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:20,
        backgroundColor:"#F7F7F7"
    },
    title:{
        fontSize:32,
        fontWeight:'bold',
        marginBottom:30,
        color:'#333'
    },
    Input:{
        width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    },
    buttonContainer:{
        width:"100%",
        marginBottom: 20,
    },
    message:{
        marginTop:20,
        fontSize:16,
        color:'green',
    },
    loadingIndicator:{
        marginTop:20,    
    }

})

export default LoginScreen
