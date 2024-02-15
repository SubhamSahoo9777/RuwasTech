const quarterOparetion={
    qc1:"0",
    qc2:"0",
    qc3:"0",
    qc4:"0",
    qe1:"0",
    qe2:"0",
    qe3:"0",
    qe4:"0",
    totalAnuallBudget:"0",
    totalExpenditure:"0",
    totalCumulativeExpenditure:"0"
}
export const TotalCalculationreducer=(state=quarterOparetion,action)=>{
switch (action.type){
case "quater":
   return(
       {
        ...state,
        ...action.values,
        totalAnuallBudget:"0",
    totalExpenditure:state.qe4 ||state.qe3||state.qe2||state.qe1,
    totalCumulativeExpenditure:state.qc4 ||state.qc3||state.qc2||state.qc1

    }
    ) 
    default:
        return state;
}

}