const userDetails={
    name:"subham kumar sahoo",
    email:"subham@gmail.com",
    password:"12345"
}
const UserReducer=(state=userDetails,action)=>{
    switch(action.type){
        case 'updateProfile':
            return{
                ...state,
                name:action.name,
                password:action.password
            }
        default:
            return state
    
    
    }
    }
    export default UserReducer
    