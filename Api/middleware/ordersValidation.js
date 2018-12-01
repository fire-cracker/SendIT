import Validator from 'validator';

/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
* @param {*} next
*/

export const OrderValidation = (req, res, next) => {
  const {
    toName, toAddress, toEmail, fromName, fromAddress, fromEmail, type, weight, price,
  } = req.body;

  const wrong = {};
  if (!toName || Validator.isEmpty(toName.trim()) || !Validator.isAlpha(toName.replace(/ +/g, ''))) {
    console.log(toName);
    wrong.toName = 'Name of sender is required';
  }
  if (!toAddress || Validator.isEmpty(toAddress.trim())) {
    wrong.toAddress = 'Address of parcel recipient is required';
  }
  if (!toEmail || Validator.isEmpty(toEmail.trim())) {
    wrong.toEmail = 'Email of parcel sender is required';
  }
  if (!fromName || Validator.isEmpty(fromName.trim()) || !Validator.isAlpha(fromName.replace(/ +/g, ''))) {
    wrong.fromName = 'Name of recipient is required';
  }
  if (!fromAddress || Validator.isEmpty(fromAddress.trim())) {
    wrong.fromAddress = 'Address of parcel sender is required';
  }
  if (!fromEmail || Validator.isEmpty(fromEmail.trim())) {
    wrong.fromEmail = 'Email of recipient is required';
  }
  if (!type || Validator.isEmpty(type.trim())) {
    wrong.type = 'Type of parcel is required';
  }
  if (type !== 'Packages' && type !== 'Documents') {
    wrong.type = 'Wrong input, do you mean Packages or Documents';
  }
  if (!weight || Validator.isEmpty(weight.trim()) || !Validator.isInt(weight)) {
    wrong.weight = 'Weight of parcel is required';
  }
  if (!price || Validator.isEmpty(price.trim()) || !Validator.isInt(price)) {
    wrong.price = 'Price of parcel is required';
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  return next();
};

// Check for Lenght
export const orderLength = (req, res, next) => {
  const {
    toName, toAddress, toEmail, fromName, fromAddress, fromEmail, weight, price,
  } = req.body;
  const wrong = {};
  if (!Validator.isLength(fromName, { min: 3, max: 30 })) {
    wrong.fromName = 'name should be between 3 to 30 characters';
  }
  if (!Validator.isLength(fromAddress, { min: 10, max: 150 })) {
    wrong.fromAddress = 'Address of sender must be between 10 to 1000 characters';
  }
  if (!Validator.isLength(fromEmail, { min: 10, max: 40 })) {
    wrong.fromEmail = 'email of sender should be between 10 to 40 characters';
  }
  if (!Validator.isLength(toName, { min: 3, max: 30 })) {
    wrong.toName = 'name of recipient should be between 3 to 30 characters';
  }
  if (!Validator.isLength(toAddress, { min: 10, max: 150 })) {
    wrong.toAddress = 'Address of recipient must be between 10 to 150 characters';
  }
  if (!Validator.isLength(toEmail, { min: 10, max: 50 })) {
    wrong.toEmail = 'email of recipient should be between 10 to 50 characters';
  }
  if (!Validator.isLength(weight, { max: 4 })) {
    wrong.weight = 'weight of parcel should be between 1 to 4 characters';
  }
  if (!Validator.isLength(price, { min: 3, max: 10 })) {
    wrong.weight = 'price of parcel should be between 3 to 10 characters';
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  return next();
};

export const emailValidation = (req, res, next) => {
  const { fromEmail, toEmail } = req.body;
  const wrong = {};
  if (!Validator.isEmail(fromEmail)) {
    wrong.fromEmail = 'Email of parcel Sender is invalid';
  }

  if (!Validator.isEmail(toEmail)) {
    wrong.toEmail = 'Email of recipient is invalid';
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  return next();
};
export const statusValidation = (req, res, next) => {
  const wrong = {};
  const { orderStatus } = req.body;
  if (!(orderStatus)) { wrong.orderStatusError = 'order status is required'; }
  if (orderStatus !== 'New' && orderStatus !== 'Pending' && orderStatus !== 'Delivered') { wrong.orderStatusError = 'wrong input, do you mean New or Pending or Delivered'; }
  if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
  return next();
};
export const locationValidation = (req, res, next) => {
  const wrong = {};
  if (!(req.body.presentLocation)) { wrong.presentLocationError = 'present location of parcel  is required'; }
  if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
  return next();
};
export const addressValidation = (req, res, next) => {
  const wrong = {};
  if (!(req.body.toAddress)) { wrong.toAddressError = 'Destination of parcel is required'; }
  if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
  return next();
};
export const cancelValidation = (req, res, next) => {
  const wrong = {};
  const { orderStatus } = req.body;
  if (!(orderStatus)) { wrong.orderStatusError = 'order status is required'; }
  if (orderStatus !== 'Cancelled') { wrong.orderStatusError = 'wrong input, do you mean Cancelled?'; }
  if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
  return next();
};

/**
* Validate post and Put request contains a valid interger ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
* @param {*} next
*/

export const parcelIdValidation = (req, res, next) => {
  const { parcelId } = req.params;

  const wrong = {};
  if (!Number.isInteger(parseInt(parcelId, 10))) {
    wrong.id = 'The Id must be a number';
  }
  if (parcelId === undefined || parcelId === null || parcelId === '') {
    wrong.parcelId = 'Parcel id  is required';
  }

  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  return next();
};

export const postIdValidation = (req, res) => {
  res.status(400).send({ status: 'unsuccessful', Error: 'Bad Request, Order ID is not Required' });
};
