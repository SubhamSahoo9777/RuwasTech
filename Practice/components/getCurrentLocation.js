import * as Location from 'expo-location';

export const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      let address = await reverseGeocode(location.coords.latitude, location.coords.longitude);
    //   setLocationInfo({ ...location, address });
    return { ...location, address }
    } catch (error) {
      alert('Error getting location:', error);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    let data = await response.json();
    if (data.display_name) {
      return data.display_name;
    } else {
      return 'Unknown Location';
    }
  };
