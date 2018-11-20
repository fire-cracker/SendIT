/**
 * Stage an instance of required data to be pushed to database
 * @param {*} req - incomming json request with data
*/
export default {
  seeder(req, hashedPassword, next) {
    if (req.body.userPassword) {
      const newUser = [req.body.userName, req.body.userEmail, hashedPassword];
      return newUser;
    } if (req.body.fromName) {
      const newOrder = [req.body.userId = req.body.userId, req.body.fromName,
        req.body.fromAddress, req.body.fromEmail,
        req.body.toName, req.body.toAddress, req.body.toEmail, req.body.type,
        req.body.weight, req.body.price];
      return newOrder;
    }
    return next();
  },
  // seed(req) {
  //   if (req.body.orderStatus) {
  //     const updateOrder = [req.body.fromName, req.body.fromAddress, req.body.fromEmail,
  //       req.body.toName, req.body.toAddress, req.body.toEmail, req.body.type,
  //       req.body.weight, req.body.price, req.body.orderstatus];
  //     return updateOrder;
  //   }
  // },
  destination(req, next) {
    if (req.body.toAddress) {
      const updateOrder = [req.body.toAddress];
      return updateOrder;
    }
    return next();
  },
  location(req, next) {
    if (req.body.presentLocation) {
      const updateLocation = [req.body.presentLocation];
      return updateLocation;
    }
    return next();
  },
  status(req, next) {
    if (req.body.orderStatus) {
      const updateStatus = [req.body.orderStatus];
      return updateStatus;
    }
    return next();
  },


};
