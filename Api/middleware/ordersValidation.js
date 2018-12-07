import Validator from 'validator';

/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
* @param {*} next
*/

export const OrderValidation = (req, res, next) => {
  const {
    toAddress, fromAddress, weight
  } = req.body;

  const wrong = [];
  if (!toAddress || Validator.isEmpty(toAddress.trim())) {
    wrong.push('Address of parcel recipient is required');
  }
  if (!fromAddress || Validator.isEmpty(fromAddress.trim())) {
    wrong.push('Address of parcel sender is required');
  }
  if (!weight || Validator.isEmpty(weight.trim()) || !Validator.isInt(weight)) {
    wrong.push('Weight of parcel is required');
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', message: wrong });
  return next();
};

// Check for Lenght
export const orderLength = (req, res, next) => {
  const {
    toAddress, fromAddress, weight
  } = req.body;
  const wrong = [];
  if (!Validator.isLength(fromAddress, { min: 10, max: 150 })) {
    wrong.fromAddress = 'Address of sender must be between 10 to 1000 characters';
  }
  if (!Validator.isLength(toAddress, { min: 10, max: 150 })) {
    wrong.toAddress = 'Address of recipient must be between 10 to 150 characters';
  }
  if (!Validator.isLength(weight, { max: 10 })) {
    wrong.weight = 'weight of parcel should be between 1 to 10 characters';
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', message: wrong });
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
