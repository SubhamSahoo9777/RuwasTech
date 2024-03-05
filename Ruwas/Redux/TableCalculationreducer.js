const quarterOperation = [
  {
    qc1: "",
    qc2: "",
    qc3: "",
    qc4: "",
    qe1: "",
    qe2: "",
    qe3: "",
    qe4: "",
    Sno: "",
    id: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    e1: "",
    e2: "",
    e3: "",
    e4: "",
    c1: "",
    c2: "",
    c3: "",
    c4: "",
  },
];

export const TotalCalculationreducer = (state = quarterOperation, action) => {
  switch (action.type) {
    case "quater":
      if (action.values.Sno === undefined || action.values.id === undefined) {
        // If Sno or id is undefined, return current state without any modifications
        return state;
      }

      const updatedState = state.map((item) => {
        if (item.Sno === action.values.Sno && item.id === action.values.id) {
          return {
            qc1: "0",
            qc2: "0",
            qc3: "0",
            qc4: "0",
            qe1: "0",
            qe2: "0",
            qe3: "0",
            qe4: "0",
            q1: "0",
            q2: "0",
            q3: "0",
            q4: "0",
            e1: "0",
            e2: "0",
            e3: "0",
            e4: "0",
            c1: " ",
            c2: " ",
            c3: " ",
            c4: " ",
            ...item,
            ...action.values,
          };
        }
        return item;
      });

      const foundIndex = state.findIndex(
        (item) => item.Sno === action.values.Sno && item.id === action.values.id
      );
      if (foundIndex === -1) {
        updatedState.push(action.values);
      }

      return updatedState;
    case "CLEAR_STATE":
      return quarterOperation;
    default:
      return state;
  }
};
