import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './src/screens/Login';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <View style={styles.container}>
      {user ? (
        <Text>Welcome {user.username} </Text>
      ) : (
        <Login setUser={setUser} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default App;
