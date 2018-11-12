import Validator from 'validator';

export const OrderValidation = (req, res, next) => {
  const {
    toName, toAddress, toEmail, fromName, fromAddress, fromEmail, type, weight,
  } = req.body;

  const wrong = {};

  if (typeof toName !== 'string' || Validator.isEmpty(toName.trim()) === '') {
    wrong.toName = 'Name of sender is required';
  }
  if (typeof toAddress !== 'string' || Validator.isEmpty(toAddress.trim()) === '') {
    wrong.toAddress = 'Address of parcel sender is required';
  }

  if (typeof toEmail !== 'string' || Validator.isEmpty(toEmail.trim()) === '') {
    wrong.toEmail = 'Email of parcel sender is required';
  }
  if (typeof fromName !== 'string' || Validator.isEmpty(fromName.trim()) === '') {
    wrong.fromName = 'Name of recipient is required';
  }
  if (typeof fromAddress !== 'string' || Validator.isEmpty(fromAddress.trim()) === '') {
    wrong.fromAddress = 'Address of parcel sender is required';
  }
  if (typeof fromEmail !== 'string' || Validator.isEmpty(fromEmail.trim()) === '') {
    wrong.fromEmail = 'Email of recipient is required';
  }
  if (typeof type !== 'string' || Validator.isEmpty(type.trim()) === '') {
    wrong.type = 'Type of parcel is required';
  }
  if (typeof weight !== 'string' || Validator.isEmpty(weight.trim()) === '') {
    wrong.fromEmail = 'Weight of is required';
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  next();
};

// Check for Lenght
export const orderLenght = (req, res, next) => {
  const {
    toName, toAddress, toEmail, fromName, fromAddress, fromEmail, type, weight,
  } = req.body;
  const wrong = {};
  if (!Validator.isLength(fromName, { min: 3, max: 30 })) {
    wrong.fromName = 'name should be between 3 to 30 characters';
  }
  if (!Validator.isLength(fromAddress, { min: 10, max: 150 })) {
    wrong.fromAddress = 'Address of sender must be between 10 to 1000 characters';
  }
  if (!Validator.isLength(fromEmail, { min: 10, max: 40 })) {
    wrong.fromEmail = 'email of sender should be between 10 to 50 characters';
  }
  if (!Validator.isLength(toName, { min: 3, max: 30 })) {
    wrong.toName = 'name of recipient should be between 3 to 30 characters';
  }
  if (!Validator.isLength(toAddress, { min: 10, max: 150 })) {
    wrong.toAddress = 'Address of recipient must be between 10 to 1000 characters';
  }
  if (!Validator.isLength(toEmail, { min: 10, max: 50 })) {
    wrong.toEmail = 'email of recipient should be between 10 to 50 characters';
  }
  if (!Validator.isLength(type, { min: 8, max: 9 })) {
    wrong.type = 'type should be between 10 to 50 characters';
  }
  if (!Validator.isLength(weight, { min: 1, max: 4 }) || !Validator.isInt(weight)) {
    wrong.weight = 'weight of parcel should be between 10 to 50 characters';
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  next();
};

export const emailvalidation = (req, res, next) => {
  const { fromEmail, toEmail } = req.body;
  const wrong = {};
  if (!Validator.isEmail(fromEmail)) {
    wrong.fromEmail = 'Email of parcel Sender is invalid';
  }

  if (!Validator.isEmail(toEmail)) {
    wrong.toEmail = 'Email of recipient is invalid';
  }
  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  next();
};


export const parcelIdValidation = (req, res, next) => {
  const { parcelId } = req.params;

  const wrong = {};
  if (parcelId === undefined || parcelId === null || parcelId === '') {
    wrong.parcelId = 'Parcel id  is required';
  }
  if (!Number.isInteger(parseInt(parcelId, 10))) {
    wrong.id = 'The Id must be a number';
  }

  if ((Object.keys(wrong).length) > 0) return res.status(400).json({ status: 'Bad Request', success: 'false', Error_Log: wrong });
  next();
};

export const orderPostIdValidation = (req, res) => {
  res.status(400).send({ status: 'unsuccessful', Error: 'Bad Request, Order ID is not Required' });
};
