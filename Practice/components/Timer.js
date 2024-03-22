import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

const Timer = () => {
  const deleteTime = new Date(2024, 2, 22, 16, 11, 0); // Set the deletion time (Year, Month, Day, Hour, Minute, Second)
  const [postVisible, setPostVisible] = useState(true);

  useEffect(() => {
    const currentTime = new Date();
    const timeUntilDelete = deleteTime - currentTime;
    const timeUntilAlert = timeUntilDelete - 5 * 60 * 1000; // 5 minutes before deletion

    if (timeUntilDelete <= 0) {
      // If the deletion time is already past, hide the post
      setPostVisible(false);
    } else {
      // Set a timer to hide the post when the deletion time is reached
      const timer = setTimeout(() => {
        setPostVisible(false);
      }, timeUntilDelete);

      // Set a timer to show alert 5 minutes before deletion
      if (timeUntilAlert > 0) {
        setTimeout(() => {
          Alert.alert('Post Deletion Alert', 'Your post will be deleted in 5 minutes.');
        }, timeUntilAlert);
      }

      // Clean up the timers when the component unmounts or post gets deleted manually
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {postVisible && <Text>post :1</Text>}
      <Text>sagar</Text>
    </View>
  );
};

export default Timer;
