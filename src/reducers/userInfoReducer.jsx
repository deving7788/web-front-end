function userInfoReducer(state, action) {
  switch (action.type) {
    case "SET_ACCOUNT_NAME":
      return {...state, accountName: action.payload};
    case "SET_DISPLAY_NAME":
      return {...state, displayName: action.payload};
    case "SET_ROLE":
      return {...state, role: action.payload};
    case "SET_EMAIL":
      return {...state, email: action.payload};
  }
}

export default userInfoReducer;
