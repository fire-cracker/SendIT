//Import statments
import model from '../seed/seeder';
import database from '../db/config';


class controller {
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
                total_orders: rowCount
            });
    }

    /**
         * Gets a particular order in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
         */
    async getOrder(req, res) {
        const command = 'SELECT * FROM orders WHERE parcel_id=$1';
            const { rows } = await database.query(command, [req.params.parcelId]);
            if (!rows[0]) {
                return res.status(404).send({
                    success: 'false',
                    status: 'Order Not Found in the Database'
                });
            } else return res.status(200).send({
                success: 'true',
                status: 'Order Retrieved Successfully',
                order: rows[0]
            });
    }

    async userOrderHistory(req, res){
        const command = 'SELECT * FROM orders WHERE user_id=$1';
            const { rows } = await database.query(command, [req.params.userId]);
            if (!rows[0]) {
                return res.status(404).send({
                    success: 'false',
                    status: 'Orders Not Found in the Database'
                });
            } else return res.status(200).json({
                success: 'true',
                status: 'Orders Retrieved Successfully',
                order: rows
            });
    }

/**
    * Add an Order to existing orders in the database
    *  @param {*} req - incomming json data
    *  @param {*} res - response to the sucess of the event
*/
async createOrder(req, res) {
    let newOrder = model.seeder(req);
    const command = `INSERT INTO
    orders(from_name, from_address, from_emailaddress, from_phonenumber, to_name, to_address, to_emailaddress, to_phonenumber, type, weight, length, width, height, price)
      VALUES($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12, $13, $14)
      returning *`;
        const { rows } = await database.query(command, newOrder);
        return res.status(201).send({
            order_sent: rows[0],
            status: 'Order Sent Successfully'
        });
}

/**
 * Update an order in the database
 *  @param {*} req - incomming json data
 * @param {*} res - response to the success of the event 
 */
async updateOrder(req, res){
    let order = model.seed(req);
    let date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE parcel_id=$1';
    const updateQuery =`UPDATE orders SET from_name=$1,from_address=$2,from_emailaddress=$3,from_phonenumber=$4,to_name=$5, to_address=$6, to_emailaddress=$7, to_phonenumber=$8, type=$9, weight=$10,length=$11,width=$12,height=$13, price=$14, order_status=$15,modified_date=$16 WHERE parcel_id=$17 returning *`;
      const { rows } = await database.query(findQuery, [req.params.parcelId]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      const response = await database.query(updateQuery, order);
      return res.status(200).send({
        parcelId: req.params.parcelId,
        old_Order: rows[0],
        update: response.rows[0],
        status: "Update successful"
    });
}

async updateDestination(req, res){
    let order = model.destination(req);
    let date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE user_id=$1';
    const updateQuery =`UPDATE orders SET to_address=$1,modified_date=$2 WHERE parcel_id=$3 returning *`;
      const { rows } = await database.query(findQuery, [req.params.parcelId]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      const response = await database.query(updateQuery, order);
      return res.status(200).send({
        parcelId: req.params.parcelId,
        old_Order: rows[0],
        update: response.rows[0],
        status: "Update successful"
    });
}

async updateLocation(req, res){
    let order = model.location(req);
    let date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE parcel_id=$1';
    const updateQuery =`UPDATE orders SET present_location=$1,modified_date=$2 WHERE parcel_id=$3 returning *`;
      const { rows } = await database.query(findQuery, [req.params.parcelId]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      const response = await database.query(updateQuery, order);
      return res.status(200).send({
        parcelId: req.params.parcelId,
        old_Order: rows[0],
        update: response.rows[0],
        status: "Update successful"
    });
}

async updateStatus(req, res){
    let order = model.status(req);
    let date = new Date();
    order.push(date);
    order.push(req.params.parcelId);
    const findQuery = 'SELECT * FROM orders WHERE parcel_id=$1';
    const updateQuery =`UPDATE orders SET order_status=$1,modified_date=$2 WHERE parcel_id=$3 returning *`;
      const { rows } = await database.query(findQuery, [req.params.parcelId]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      const response = await database.query(updateQuery, order);
      return res.status(200).send({
        parcelId: req.params.parcelId,
        old_Order: rows[0],
        update: response.rows[0],
        status: "Update successful"
    });
}

/**
* Delete an order in the database
*  @param {*} req - incomming request data
* @param {*} res - response to the validity of the data
*/
async deleteOrder(req, res) {
    const deleteQuery = 'DELETE FROM orders WHERE parcel_id=$1 returning *';
      const { rows } = await database.query(deleteQuery, [req.params.parcelId]);
      if(!rows[0]) {
        return res.status(404).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      return res.status(200).send({
        success: 'true',
        status: 'Order Deleted Successfuly'
    });
  }

  /**
* Delete orders of a particular user in the database
*  @param {*} req - incomming request data
* @param {*} res - response to the validity of the data
*/
async deleteUserOrder(req, res) {
    const deleteQuery = 'DELETE FROM orders WHERE user_id=$1 returning *';
      const { rows } = await database.query(deleteQuery, [req.params.userId]);
      if(!rows[0]) {
        return res.status(404).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      return res.status(200).send({
        success: 'true',
        status: 'Order Deleted Successfuly'
    });
  }
}




const Controller = new controller();
export default Controller;
