const location = {
 place:{}
};
export const LocationReducer = (state = location, action) => {
  switch (action.type) {
    case "location":
      return {
        place:action.place
      };
    default:
      return state;
  }
};
