import db from '../db/db';
/* eslint-disable class-methods-use-this */
class Controller {
  getAllOrders(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Orders retrieved successfully',
      orders: db,
    });
  }

  getOrder(req, res) {
    let orderFound;
    const parcelId = parseInt(req.params.parcelId, 10);
    db.map((order) => {
      if (order.parcelId === parcelId) {
        orderFound = order;
        return res.status(200).send({
          success: 'true',
          message: 'order retrieved successfully',
          order,
        });
      }
    }); if (!orderFound) {
      return res.status(404).send({
        success: 'false',
        message: 'order not found',
      });
    } return res.status(404).send({
      success: 'false',
      message: 'order does not exist',
    });
  }

  createOrder(req, res) {
    const order = {
      parcelId: db.length + 1,
      fromName: req.body.fromName,
      fromAddress: req.body.fromAddress,
      fromEmail: req.body.fromEmail,
      toName: req.body.toName,
      toAddress: req.body.toAddress,
      toEmail: req.body.toEmail,
      type: req.body.type,
      weight: req.body.weight,
    };
    db.push(order);
    return res.status(201).send({
      success: 'true',
      message: 'order added successfully',
      order,
    });
  }

  updateOrder(req, res) {
    const parcelId = parseInt(req.params.parcelId, 10);
    let orderFound;
    let itemIndex;
    db.map((order, index) => {
      if (order.parcelId === parcelId) {
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
      parcelId: orderFound.parcelId,
      fromName: req.body.fromName || orderFound.fromName,
      fromAddress: req.body.fromAddress || orderFound.fromAddress,
      fromEmail: req.body.fromEmail || orderFound.fromEmail,
      toName: req.body.toName || orderFound.toName,
      toAddress: req.body.toAddress || orderFound.toAddress,
      toEmail: req.body.toEmail || orderFound.toEmail,
      type: req.body.type || orderFound.type,
      weight: req.body.weight || orderFound.weight,

    };
    db.splice(itemIndex, 1, neworder);

    return res.status(200).send({
      success: 'true',
      message: 'order added successfully',
      neworder,
    });
  }

  deleteOrder(req, res) {
    const parcelId = parseInt(req.params.parcelId, 10);
    let orderFound;
    let itemIndex;
    db.map((order, index) => {
      if (order.parcelId === parcelId) {
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

const controller = new Controller();
export default controller;
