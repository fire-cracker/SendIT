import Validator from 'validator';
/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
*/
export const userValidation = (req, res, next) => {
  const {
    userName, userEmail, userPassword,
  } = req.body;
  const error = {};

  if (!userName || Validator.isEmpty(userName.trim()) || !Validator.isAlphanumeric(userName.replace(/ +/g, ""))) {
    error.userName = 'userName is Required';
  }
  if (!userEmail || Validator.isEmpty(userEmail.trim())) {
    error.userEmail = 'Email is Required';
  }
  if (!userPassword || Validator.isEmpty(userPassword.trim())) {
    error.userPassword = 'Password is Required';
  }
  if ((Object.keys(error).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: error }); }
  return next();
};

export const userLogin = (req, res, next) => {
  const {
    userEmail, userPassword,
  } = req.body;
  const error = {};
  if (!userEmail || Validator.isEmpty(userEmail.trim())) {
    error.userEmail = 'Email is Required';
  }
  if (!userPassword || Validator.isEmpty(userPassword.trim())) {
    error.userPassword = 'Password is Required';
  }
  if ((Object.keys(error).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: error }); }
  return next();
};

// Check for Lenght
export const userLength = (req, res, next) => {
  const {
    userName, userEmail, userPassword,
  } = req.body;
  const error = {};
  if (!Validator.isLength(userName, { min: 3, max: 30 })) {
    error.userName = 'name should be between 3 to 30 characters';
  }
  if (!Validator.isLength(userEmail, { min: 10, max: 30 })) {
    error.userEmail = 'email must be between 10 to 30 characters';
  }
  if (!Validator.isLength(userPassword, { min: 8, max: 15  })) {
    error.userPassword = 'Passowrd of sender should be between 8 to 15 characters';
  }
  if ((Object.keys(error).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: error });
  return next();
};
/**
* Validate email contains a valid
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
*/
export const emailvalidation = (req, res, next) => {
  const { userEmail } = req.body;
  const error = {};
  if (!Validator.isEmail(userEmail)) {
    error.userEmail = 'Email of parcel Sender is invalid';
  }
  if ((Object.keys(error).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: error });
  return next();
};

/**
* Validate post and Put request contains a valid integer ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
*/
export const userIdValidation = (req, res, next) => {
  const { userId } = req.params;
  const error = {};
  if (!Number.isInteger(parseInt(userId, 10))) {
    error.userId = 'The Id must be a number';
  }
  if (userId === undefined || userId === null || userId === '') {
    error.userId = 'User id  is required';
  }

  if ((Object.keys(error).length) > 0) { return res.status(400).send({ status: 'unsuccessful', Error_Log: error }); }
  return next();
};

export const userPostIdValidation = (req, res) => {
  res.status(400).send({ status: 'unsuccessful', Error: 'Bad Request, User ID is not Required' });
};
