import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashborad = ({route}) => {
    const {token} = route.params;
    const [user, setuser] = useState([]);

    useEffect(() => {
        const fetchAlluser = async () => {
            try{
                const res = await axios.get('http://192.168.1.113:5000/api/users/all-user', {

                    headers:{
                        Authorization: `Bearer ${token}`,
                    
                    },
                });
                setuser(res.data);
            }catch(err){
                console.log("failed to fresh users", err)
            }
        };
        fetchAlluser();
    },[token])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Users</Text>
      <FlatList
        data={user}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userText}>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      userCard: {
        padding: 15,
        backgroundColor: '#f1f1f1',
        marginBottom: 10,
        borderRadius: 8,
      },
      userText: {
        fontSize: 18,
      },
})

export default Dashborad;