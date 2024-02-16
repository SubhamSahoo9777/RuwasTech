const allTask = [];
const ModalActivityReducer = (state = allTask, action) => {
  switch (action.type) {
    case "modalUpdate":
      const updatedState = state.map((item) => {
        if (
          item.Sno === action.object.Sno &&
          item.quarteSelected === action.object.quarteSelected &&
          item.modelActivity === action.object.modelActivity
        ) {
          // If a matching item is found, update it
          return action.object;
        }
        return item;
      });

      // If no matching item was found, add the new object
      if (
        !updatedState.some(
          (item) =>
            item.Sno === action.object.Sno &&
            item.quarteSelected === action.object.quarteSelected &&
            item.modelActivity === action.object.modelActivity
        )
      ) {
        updatedState.push(action.object);
      }

      return updatedState;
    case "clearModal":
      // Clear the state by returning an empty array
      return [];
    default:
      return state;
  }
};

export default ModalActivityReducer;
