import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ButtonBase from '../components/ui/ButtonBase';

const Home = ({ user, setUser }) => {
  return (
    <View>
      <View style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 12 }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1574761828925-fe44fd0670d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80',
          }}
          style={styles.image}
        />
      </View>
      <Text>Welcome {user.username}</Text>
      <ButtonBase
        title="Log out"
        handlePress={() => setUser(null)}
        bg={{ backgroundColor: '#D2042D', marginTop: 16 }}
        color={{ color: '#fff' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default Home;
