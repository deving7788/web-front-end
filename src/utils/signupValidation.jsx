const accNameValidConst = {
  INITIAL_PROM: "",
  ZERO_LENGTH: "Please enter an account name which CANNOT be changed",
  INVALID_CHARACTER: "Please use letters or numbers",
  ACCOUNT_NAME_IS_TAKEN: "This account name has been taken",
  OK: "",
}

const disNameValidConst = {
  INITIAL_PROM: "",
  ZERO_LENGTH: "Please enter a display name",
  INVALID_CHARACTER: "Please use letters, numbers, or _",
  DISPLAY_NAME_IS_TAKEN: "This display name has been taken",
  OK: "",
}

const emailValidConst = {
  INITIAL_PROM: "",
  INVALID_FORMAT: "Please use correct email format",
  ZERO_LENGTH: "Please enter your email address",
  EMAIL_IS_USED: "This email has been used",
  OK: "",
}

const passValidConst = {
  INITIAL_PROM: "",
  ZERO_LENGTH: "Please enter password",
  ZERO_LENGTH_CONF_PASS: "",
  SHORTER_THAN_SIX: "Please use at least 8 characters",
  ALL_NUMBER: "Please do not use numbers only",
  NO_Numbers: "Please include numbers", 
  NO_UPPER_CASE: "Please include uppercase letters",
  OK: "",
  INVALID_CHARACTER: "Please use numbers, letters, and $, _, !, -, @",
  PASSWORDS_NOT_SAME: "Passwords must be same",
}


function validateAccountName(name) {
  if(name.length === 0) {
    return "ZERO_LENGTH"
  }

  const regex = new RegExp("^[0-9a-zA-Z]+$");
  const result = regex.test(name);
  if(result) {
    return "OK"
  }else{
    return "INVALID_CHARACTER";
  }
}

function validateDisplayName(name) {
  if(name.length === 0) {
    return "ZERO_LENGTH"
  }
  const regex = new RegExp("^[0-9a-zA-Z_-]+$");
  const result = regex.test(name);
  if(result) {
    return "OK"
  }else {
    return "INVALID_CHARACTER"
  }
}

function validateEmail(email) {
  if(email.length === 0) {
    return "ZERO_LENGTH"
  }
  const regex = new RegExp("^[^@]+@[^@]+$");
  const result = regex.test(email);
  if(result) {
    return "OK"; 
  }
  return "INVALID_FORMAT";
}


function validatePassword(password) {
  if(password.length  === 0){
    return "ZERO_LENGTH";
  }
  if(password.length < 8){
    return "SHORTER_THAN_SIX";
  }

  const regex = new RegExp("^[0-9a-zA-Z@$_!-]{8,}$");
  const rofRegex = regex.test(password);
  if(rofRegex === true) {
    
    const notAllNum = new RegExp("[^0-9]");
    const rofNotAllNum = notAllNum.test(password);
    if(!rofNotAllNum){
      return "ALL_NUMBER";
    }

    const containsLetter = new RegExp("[^a-zA-Z@$_!-]");
    const rofContainsLetter = containsLetter.test(password);
    if(!rofContainsLetter){
      return "NO_Numbers"; 
    }

    const containsUpp = new RegExp("[A-Z]");
    const rofContainsUpp = containsUpp.test(password);
    if(!rofContainsUpp){
      return "NO_UPPER_CASE";
    }
    return "OK";
  }else {
    return "INVALID_CHARACTER"; 
  }
    
}

export {accNameValidConst, disNameValidConst, passValidConst, emailValidConst, validateAccountName, validateDisplayName, validateEmail, validatePassword};
