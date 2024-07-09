
/** reducer function for updating the fields **/
function signupReducer(state, action) {
  switch(action.type) {
    case "RESET_ACCOUNT_NAME":
      return {...state, accountName: action.payload};
    case "RESET_DISPLAY_NAME":
      return {...state, displayName: action.payload};
    case "RESET_EMAIL":
      return {...state, email: action.payload};
    case "RESET_CREATE_PASSWORD":
      return {...state, createPassword: action.payload};
    case "RESET_CONFIRM_PASSWORD": 
      return {...state, confirmPassword: action.payload};
    case "RESET_ACCOUNT_NAME_PROM": 
      return {...state, accountNameProm: action.payload};
    case "RESET_DISPLAY_NAME_PROM": 
      return {...state, displayNameProm: action.payload};
    case "RESET_EMAIL_PROM": 
      return {...state, emailProm: action.payload};
    case "RESET_CREATE_PASSWORD_PROM": 
      return {...state, createPasswordProm: action.payload};
    case "RESET_CONFIRM_PASSWORD_PROM": 
      return {...state, confirmPasswordProm: action.payload};
    default:
      console.warn("Unknown action type in signupReducer: ", action.type);
      return {...state};
	}
}

export default signupReducer;

