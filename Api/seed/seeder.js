/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json request with data
*/
export default {
    seeder(req, hashedPassword) {
        if (req.body.user_password) {
            let newUser = [req.body.user_name, req.body.user_email, hashedPassword];
            return newUser;
        } else if (req.body.from_name) {
            let newOrder = [req.body.from_name, req.body.from_address, req.body.from_emailaddress, req.body.from_phonenumber, req.body.to_name, req.body.to_address, req.body.to_emailaddress, req.body.to_phonenumber, req.body.type, req.body.weight, req.body.width, req.body.length, req.body.height, req.body.price];
            return newOrder;
        }
    },
    seed(req) {
        if (req.body.order_status) {
            let updateOrder = [req.body.from_name, req.body.from_address, req.body.from_emailaddress, req.body.from_phonenumber, req.body.to_name, req.body.to_address, req.body.to_emailaddress, req.body.to_phonenumber, req.body.type, req.body.weight, req.body.width, req.body.length, req.body.height, req.body.price, req.body.order_status,];
            return updateOrder;
        }
    },
    destination(req) {
        if (req.body.to_address) {
            let updateOrder = [req.body.to_address];
            return updateOrder;
        }
    },
    location(req) {
        if (req.body.present_location) {
            let updateLocation = [ req.body.present_location];
            return updateLocation ;
        }
    },
    status(req) {
        if (req.body.order_status) {
            let updateStatus = [req.body.order_status];
            return updateStatus;
        }
    }


}



