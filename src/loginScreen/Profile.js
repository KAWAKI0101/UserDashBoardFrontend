import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';


const Profile = ({ route, navigation }) => {
  const { token } = route.params;
  const [loading, setLoading] = useState(true);  // loading true by default
  const [userData, setUserData] = useState(null);
  const [user, setuser] = useState([]);
  const [showUser, setShowUser] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://192.168.1.113:5000/api/users/profile', {

          headers: {
            Authorization: `Bearer ${token}`,

          },
        });
        console.log('Profile Data:', res.data);

        setUserData(res.data); // Set the fetched data
      } catch (err) {
        console.error('Profile fetch error', err);
      } finally {
        setLoading(false)// stop loading after fetch
      }
    }
    fetchProfile();
  }, [token]);


  const fetchAllUser = async () => {
    try {
      const res = await axios.get('http://192.168.1.113:5000/api/users/all-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setuser(res.data);
      setShowUser(true);
    } catch (err) {
      console.error("Failed to fetch all user", err)
    }
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.title}>Profile Screen</Text>
      {userData ? (
        <>
          <Text style={styles.text}>Username: {userData.username}</Text>
          <Text style={styles.text}>Status: {userData.status}</Text>
          {/* If you have more user details like username, email, etc, you can show them here */}
        </>
      ) : (
        <Text style={styles.text}>No User Data Found</Text>
      )}

      <Button
        title='Show All Registered Users'
        onPress={() => navigation.navigate('Dashboard', { token })}
      />

      {showUser && (
        <FlatList
          data={user}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          renderItem={({ item }) => (
            <View>
              <Text> {item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};


export default Profile

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 20,
    margin: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  gridContainer: {
    marginTop: 20,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 10,
  },

});