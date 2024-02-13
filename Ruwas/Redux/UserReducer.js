const userDetails = [];

const UserReducer = (state = userDetails, action) => {
    switch (action.type) {
        case 'userId':
            return action.userId
                
                
          
        default:
            return state;
    }
};
export default UserReducer

    