import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [posts, setPosts] = useState([]);
  
  // Function to create a new post
  const createPost = () => {
    const newPost = { 
      id: posts.length + 1, 
      content: `Post ${posts.length + 1}`,
      timestamp: Date.now() // Adding timestamp
    };
    setPosts(prevPosts => [...prevPosts, newPost]);
  };

  // Effect hook to start the interval when posts change
  useEffect(() => {
    const interval = setInterval(() => {
      // Your functionality to trigger every 2 seconds goes here
      console.log("Functionality triggered");
    }, 2000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, [posts]);

  // Function to calculate time elapsed since post creation
  const getTimeElapsed = (timestamp) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} seconds ago`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Create Post" onPress={createPost} />
      <View>
        <Text>Posts:</Text>
        {posts.map(post => (
          <View key={post.id}>
            <Text>{post.content}</Text>
            <Text>{getTimeElapsed(post.timestamp)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default App;
