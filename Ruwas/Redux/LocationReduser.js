const location = {
  longitude: "0",
  latitude: "0",
};
export const LocationReducer = (state = location, action) => {
  switch (action.type) {
    case "location":
      return {
        longitude: action.longitude,
        latitude: action.latitude,
      };
    default:
      return state;
  }
};
