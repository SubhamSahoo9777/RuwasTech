import React from 'react';
import { View, Text } from 'react-native';

const Timer = () => {
  // Define your start and end dates
  const startDate = new Date('2024-04-01'); // example start date
  const endDate = new Date('2024-04-15');   // example end date

  // Get the current date
  const currentDate = new Date();

  // Check if the current date is within the specified range
  const shouldShowMessage = currentDate >= startDate && currentDate <= endDate;

  return (
    <View>
      {shouldShowMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Your message here</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  messageContainer: {
    padding: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 10,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};



export default Timer;
