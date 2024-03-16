import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const getCurrentMonth = () => {
  const d = new Date();
  const options = { timeZone: 'Africa/Kampala' };
  return d.toLocaleString('en-UG', options).split(" ")[0].slice(3,5);
};

const App = () => {
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
   let m=getCurrentMonth().split(" ")[0].slice(3,5)
   console.log(m)
  }, []);

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>Current Month: {getCurrentMonth()}</Text>
    </View>
  );
};

export default App;
