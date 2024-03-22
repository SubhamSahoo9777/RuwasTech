import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Timer from './components/Timer';

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
 <Timer/>
  );
};

export default App;
