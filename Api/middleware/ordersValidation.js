/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
* @param {*} next 
*/

function orderValidation(req, res, next) {
    let wrong = {};
    if (!(req.body.from_name)) { wrong.from_nameError = 'name of parcel sender is required'; }
    if (!(req.body.from_address)) { wrong.from_addressError = 'address of parcel sender is required'; }
    if (!(req.body.from_emailaddress)) { wrong.from_emailaddressError = 'emailaddress of parcel sender is required'; }
    if ((req.body.from_phonenumber) != undefined) { if (!(Number.isInteger(parseInt(req.body.from_phonenumber))===true)) {wrong.phonenumberError = 'Phone number of parcel sender is not Valid';}} 
    if (!(req.body.from_phonenumber)) { wrong.from_phonenumberError = 'Phone Number of parcel sender is Required'; }
    if (!(req.body.to_name)) { wrong.to_nameError = 'name of recipient is required'; }
    if (!(req.body.to_address)) { wrong.to_addressError = 'address of recipient is required'; }
    if (!(req.body.to_emailaddress)) { wrong.to_emailaddressError = 'emailaddress of recipient is required'; }
    if ((req.body.to_phonenumber) != undefined) { if (!(Number.isInteger(parseInt(req.body.to_phonenumber))===true)) {wrong.toPhonenumber = 'Phone number of recipient is not Valid';}} 
    if (!(req.body.to_phonenumber)) { wrong.to_phonenumberError = 'Phone number of recipient is required'; }
    if (!(req.body.type)) { wrong.typeError = 'type of parcel is required'; }
    if ((req.body.weight) != undefined) { if (!(Number.isInteger(parseInt(req.body.weight))===true)) {wrong.weightError = 'weight is not Valid';}}
    if (!(req.body.weight)) { wrong.weightError = 'weight of parcel is required'; }
    if ((req.body.length) != undefined) { if (!(Number.isInteger(parseInt(req.body.length))===true)) {wrong.lengthError = 'length is not Valid';}}
    if (!(req.body.length)) { wrong.lengthError = 'length of parcel is required'; }
    if ((req.body.width) != undefined) { if (!(Number.isInteger(parseInt(req.body.width))===true)) {wrong.widthError = 'width is not Valid';}}
    if (!(req.body.width)) { wrong.widthError = 'width of parcel is required'; }
    if ((req.body.height) != undefined) { if (!(Number.isInteger(parseInt(req.body.height))===true)) {wrong.heightError = 'height is not Valid';}}
    if (!(req.body.height)) { wrong.heightError = 'height of parcel is required'; }
    if ((req.body.price) != undefined) { if (!(Number.isInteger(parseInt(req.body.price))===true)) {wrong.priceError = 'height is not Valid';}}
    if (!(req.body.price)) { wrong.priceError = 'height of parcel is required'; }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
    next();
}

function statusValidation(req, res, next) {
    let wrong = {};
    if (!(req.body.order_status)) { wrong.order_statusError = 'order status is required'; }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
    next();
};
function locationValidation(req, res, next) {
    let wrong = {};
    if (!(req.body.present_location)) { wrong.present_locationError = 'present location of parcel  is required'; }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
    next();
};
function addressValidation(req, res, next) {
    let wrong = {};
    if (!(req.body.to_address)) { wrong.to_addressError = 'Destination of parcel is required'; }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
    next();
};
 
/**
* Validate post and Put request contains a valid interger ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
* @param {*} next 
*/

function parcelIdValidation(req, res, next) {
    let wrong = {};
    const id = req.params.parcelId;
    if (id === undefined || id === null || id === "") { wrong.parcelId_Error = 'Bad Request, Parcel ID is Required'; }
    else { if (!(Number.isInteger(parseInt(id))===true)) { wrong.status = 'unsuccessful'; wrong.parcelId_Error = 'Bad Request, Parcel ID is not Valid'; } }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: "unsuccessful", Error_Log: wrong }); }
    next();
}

function orderPostIdValidation(req, res, next) {
    return res.status(400).send({ status: "unsuccessful", Error: "Bad Request, Order ID is not Required" });
}

//export statement
export default {
    Validation: orderValidation,
    parcelIdValidation: parcelIdValidation,
    PostIdValidation: orderPostIdValidation,
    statusValidation:statusValidation,
    locationValidation:locationValidation,
    addressValidation:addressValidation
};