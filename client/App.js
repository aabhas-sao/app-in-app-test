import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ButtonBase from './src/components/ui/ButtonBase';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {user ? <Home setUser={setUser} user={user} /> : <Login setUser={setUser} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default App;
