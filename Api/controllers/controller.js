import db from '../db/db';
/* eslint-disable class-methods-use-this */
class controller {
  getAllOrders(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Orders retrieved successfully',
      orders: db,
    });
  }

  getOrder(req, res) {
    try {
    let orderFound;
    const orderId = parseInt(req.params.orderId, 10);
    db.map((order) => {
      if (order.orderId === orderId) {
        orderFound = order;
        return res.status(200).send({
          success: 'true',
          message: 'order retrieved successfully',
          order,
        });
      }
    });if (!orderFound) {
      return res.status(404).send({
        success: 'false',
        message: 'order not found',
      });
    }
  }catch(error) {
    return res.status(404).send({
      success: 'false',
      message: 'order does not exist',
    });
  }
  }

  createOrder(req, res) {
    const order = {
      orderId: db.length + 1,
      from: {
        name: req.body.name,
        address: req.body.address,
        emailaddress: req.body.emailaddress,
        phonenumber: req.body.phonenumber,
      },
    
      to: {
        toName: req.body.toName,
        toAddress: req.body.toAddress,
        toEmailaddress: req.body.toEmailaddress,
        toPhonenumber: req.body.toPhonenumber,
      },
    
      parceldetails: {
        type: req.body.type,
        weight: req.body.weight,
        dimension: {
          width: req.body.width,
          length: req.body.length,
          height: req.body.height,
        }
      },
     
    };
    db.push(order);
    return res.status(201).send({
      success: 'true',
      message: 'order added successfully',
      order,
    });
  }

  updateOrder(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    let orderFound;
    let itemIndex;
    db.map((order, index) => {
      if (order.orderId === orderId) {
        orderFound = order;
        itemIndex = index;
      }
    });

    if (!orderFound) {
      return res.status(404).send({
        success: 'false',
        message: 'order not found',
      });
    }

    const neworder = {
      orderId: orderFound.orderId,
      from: {
        name: req.body.name || orderFound.name,
        address: req.body.address || orderFound.address,
        emailaddress: req.body.emailaddress || orderFound.emailaddress,
        phonenumber: req.body.phonenumber || orderFound.phonenumber,
      },
    
      to: {
        toName: req.body.toName || orderFound.toName,
        toAddress: req.body.toAddress || orderFound.toAddress,
        toEmailaddress: req.body.toEmailaddress || orderFound.toEmailaddress,
        toPhonenumber: req.body.toPhonenumber || orderFound.toPhoneNumber,
      },
    
      parceldetails: {
        type: req.body.type || orderFound.type,
        weight: req.body.weight || orderFound.weight,
        dimension: {
          width: req.body.width || orderFound.width,
          length: req.body.length || orderFound.length,
          height: req.body.height || orderFound.height,
        }
      },
    
    };
    db.splice(itemIndex, 1, neworder);

    return res.status(201).send({
      success: 'true',
      message: 'order added successfully',
      neworder,
    });
  }

  deleteOrder(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    let orderFound;
    let itemIndex;
    db.map((order, index) => {
      if (order.orderId === orderId) {
        orderFound = order;
        itemIndex = index;
      }
    });

    if (!orderFound) {
      return res.status(404).send({
        success: 'false',
        message: 'order not found',
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'order deleted successfuly',
    });
  }

 
}


const Controller = new controller();
export default Controller;
