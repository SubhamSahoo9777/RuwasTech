const UserInfo={
type:"",
userId:"",
Longitude:"",
Latitude:"",
districtId:"",
}
const UserdetailsReducer = (state = UserInfo, action) => {
    switch (action.type) {
        case 'userDetails':
            return {
                
               userId:action.userDetails.userId,
        
               districtId:action.userDetails.districtId,
            }
        case 'types':
            return {
                ...state,
               type:action.typeof.type,
         
            }
        case 'location':
            return {
                ...state,

               Longitude:action.locattion.Longitude,
               Latitude:action.locattion.Latitude,
    
            }
                
                
          
        default:
            return state;
    }
};
export default UserdetailsReducer