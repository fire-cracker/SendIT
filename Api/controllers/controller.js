// Import statments
import database from '../db/config';


class Controller {
  /**
        * Gets All orders in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data
    */
  async getAllOrders(req, res) {
    const command = 'SELECT * FROM orders';
    const { rows, rowCount } = await database.query(command);
    return res.status(200).send({
      success: 'true',
      status: 'Orders Retrieved Successfully',
      orders: rows,
      totalOrders: rowCount,
    });
  }

  /**
         * Gets a particular order in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
         */
  async getOrder(req, res) {
    const command = 'SELECT * FROM orders WHERE "parcelId"=$1';
    const { rows } = await database.query(command, [req.params.parcelId]);
    if (!rows[0]) {
      return res.status(404).send({
        success: 'false',
        status: 'Order Not Found in the Database',
      });
    } return res.status(200).send({
      success: 'true',
      status: 'Order Retrieved Successfully',
      order: rows[0],
    });
  }

  async userOrderHistory(req, res) {
    const user = req.body.userName;
    const command = 'SELECT * FROM orders WHERE "userId"=$1';
    const { rows, rowCount } = await database.query(command, [req.params.userId]);
    if (!rows[0]) {
      return res.status(404).send({
        success: 'false',
        status: 'Orders Not Found in the Database',
      });
    } return res.status(200).json({
      success: 'true',
      status: 'Orders Retrieved Successfully',
      user,
      order: rows,
      totalOrders: rowCount,
    });
  }

  /**
    * Add an Order to existing orders in the database
    *  @param {*} req - incomming json data
    *  @param {*} res - response to the sucess of the event
*/
  async createOrder(req, res) {
    const {
      fromName, fromAddress, fromEmail, toName, toAddress, toEmail, type, weight, price,
    } = req.body;
    const user = req.body.userName;
    const newOrder = [req.body.userId = req.body.userId, fromName, fromAddress, fromEmail,
      toName, toAddress, toEmail, type, weight, price];
    const command = `INSERT INTO
    orders("userId","fromName", "fromAddress", "fromEmail", "toName", "toAddress", "toEmail", type, weight, price)
      VALUES($1, $2, $3, $4, $5,$6, $7, $8, $9, $10)
      returning *`;
    const { rows } = await database.query(command, newOrder, user);
    return res.status(201).send({
      user,
      order_sent: rows[0],
      status: 'Order Sent Successfully',
    });
  }

  async updateDestination(req, res) {
    const user = req.body.userName;
    const { toAddress } = req.body;
    const order = [toAddress];
    const date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE "parcelId"=$1';
    const updateQuery = 'UPDATE orders SET "toAddress"=$1,"modifiedDate"=$2 WHERE "parcelId"=$3 returning *';
    const { rows } = await database.query(findQuery, [req.params.parcelId]);
    if (!rows[0]) {
      return res.status(410).send({
        success: 'false',
        status: 'Order Not Found in the Database',
      });
    }
    const response = await database.query(updateQuery, order, user);
    return res.status(200).send({
      user,
      parcelId: req.params.parcelId,
      old_Order: rows[0],
      update: response.rows[0],
      status: 'Update successful',
    });
  }

  async updateLocation(req, res) {
    const user = req.body.userName;
    const { presentLocation, orderStatus } = req.body;
    const order = [presentLocation, orderStatus];
    const date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE "parcelId"=$1';
    const updateQuery = 'UPDATE orders SET "presentLocation"=$1,"orderStatus"=$2,"modifiedDate"=$3 WHERE "parcelId"=$4 returning *';
    const { rows } = await database.query(findQuery, [req.params.parcelId]);
    if (!rows[0]) {
      return res.status(410).send({
        success: 'false',
        status: 'Order Not Found in the Database',
      });
    }
    const response = await database.query(updateQuery, order, user);
    return res.status(200).send({
      user,
      parcelId: req.params.parcelId,
      old_Order: rows[0],
      update: response.rows[0],
      status: 'Update successful',
    });
  }

  async updateStatus(req, res) {
    const user = req.body.userName;
    const { orderStatus } = req.body;
    const order = [orderStatus];
    const date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE "parcelId"=$1';
    const updateQuery = 'UPDATE orders SET "orderStatus"=$1,"modifiedDate"=$2 WHERE "parcelId"=$3 returning *';
    const { rows } = await database.query(findQuery, [req.params.parcelId]);
    if (!rows[0]) {
      return res.status(410).send({
        success: 'false',
        status: 'Order Not Found in the Database',
      });
    }
    const response = await database.query(updateQuery, order, user);
    return res.status(200).send({
      user,
      parcelId: req.params.parcelId,
      old_Order: rows[0],
      update: response.rows[0],
      status: 'Update successful',
    });
  }

  async cancelOrder(req, res) {
    const user = req.body.userName;
    const { orderStatus } = req.body;
    const order = [orderStatus];
    const date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE "parcelId"=$1';
    const updateQuery = 'UPDATE orders SET "orderStatus"=$1,"modifiedDate"=$2 WHERE "parcelId"=$3 returning *';
    const { rows } = await database.query(findQuery, [req.params.parcelId]);
    if (!rows[0]) {
      return res.status(410).send({
        success: 'false',
        status: 'Order Not Found in the Database',
      });
    }
    const response = await database.query(updateQuery, order, user);
    return res.status(200).send({
      user,
      parcelId: req.params.parcelId,
      old_Order: rows[0],
      update: response.rows[0],
      status: 'Order Cancelled successful',
    });
  }

  /**
   /**
 * Delete an order in the database
 *  @param {*} req - incomming request data
 * @param {*} res - response to the validity of the data
 */
  async deleteOrder(req, res) {
    const deleteQuery = 'DELETE FROM orders WHERE "parcelId"=$1 returning *';
    const { rows } = await database.query(deleteQuery, [req.params.parcelId]);
    if (!rows[0]) {
      return res.status(404).send({
        success: 'false',
        status: 'Order Not Found in the Database',
      });
    }
    return res.status(200).send({
      success: 'true',
      status: 'Order deleted successfully',
    });
  }
}


const controller = new Controller();
export default controller;
