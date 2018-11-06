/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
* @param {*} next 
*/
function orderValidation(req, res, next) {
    let wrong = {};
    if (!(req.body.name)) { wrong.nameError = 'name of parcel sender is required'; }
    if (!(req.body.address)) { wrong.addressError = 'address of parcel sender is required'; }
    if (!(req.body.emailaddress)) { wrong.emailaddressError = 'emailaddress of parcel sender is required'; }
    if ((req.body.phonenumber) != undefined) { if (!(Number.isInteger(parseInt(req.body.phonenumber))===true)) {wrong.phonenumberError = 'Phone number of parcel sender is not Valid';}} 
    if (!(req.body.phonenumber)) { wrong.phonenumberError = 'Phone Number of parcel sender is Required'; }
    if (!(req.body.toName)) { wrong.toNameError = 'name of recipient is required'; }
    if (!(req.body.toAddress)) { wrong.toAddressError = 'address of recipient is required'; }
    if (!(req.body.toEmailaddress)) { wrong.toEmailaddressError = 'emailaddress of recipient is required'; }
    if ((req.body.toPhonenumber) != undefined) { if (!(Number.isInteger(parseInt(req.body.toPhonenumber))===true)) {wrong.toPhonenumber = 'Phone number of recipient is not Valid';}} 
    if (!(req.body.toPhonenumber)) { wrong.toPhonenumberError = 'Phone number of recipient is required'; }
    if (!(req.body.type)) { wrong.typeError = 'type of parcel is required'; }
    if ((req.body.weight) != undefined) { if (!(Number.isInteger(parseInt(req.body.weight))===true)) {wrong.weightError = 'weight is not Valid';}}
    if (!(req.body.weight)) { wrong.weightError = 'weight of parcel is required'; }
    if ((req.body.length) != undefined) { if (!(Number.isInteger(parseInt(req.body.length))===true)) {wrong.lengthError = 'length is not Valid';}}
    if (!(req.body.length)) { wrong.lengthError = 'length of parcel is required'; }
    if ((req.body.width) != undefined) { if (!(Number.isInteger(parseInt(req.body.width))===true)) {wrong.widthError = 'width is not Valid';}}
    if (!(req.body.width)) { wrong.widthError = 'width of parcel is required'; }
    if ((req.body.height) != undefined) { if (!(Number.isInteger(parseInt(req.body.height))===true)) {wrong.heightError = 'height is not Valid';}}
    if (!(req.body.height)) { wrong.heightError = 'height of parcel is required'; }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
    next();
}
 
/**
* Validate post and Put request contains a valid interger ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
* @param {*} next 
*/
function orderIdValidation(req, res, next) {
    const orderId = req.params.orderId;
    if (orderId === undefined || orderId === null || orderId === "") { 
        console.log("got here")
        return res.status(400).send({
            success: 'false',
            message: 'orderId is required',
          }); 
    }else if (!(Number.isInteger(parseInt(orderId))===true)){
            console.log("got here 2") 
            return res.status(400).send({
                success: 'false',
                message: ' OrderId is not Valid',
              }); 
          }
    next();
}

function orderPostIdValidation(req, res, next) {
    return res.status(400).send({ status: "unsuccessful", Error: "Bad Request, Order ID is not Required" });
}

//export statement
export default {
    Validation: orderValidation,
    orderIdValidation: orderIdValidation,
    PostIdValidation: orderPostIdValidation
};