// Import statments
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import database from '../db/config';
import model from '../seed/seeder';

dotenv.config();

// create a token
async function createToken(data) {
  const token = await jwt.sign({
    userId: data.userId,
    userName: data.userName,
    userEmail: data.userEmail,
    userRole: data.userRole,
  }, process.env.User_Secret, {
    expiresIn: 60 * 60, // expires in 1 hour
  });
  return token;
}

class Controller {
  async signup(req, res) {
    const stmt = 'SELECT "userId" FROM user_accounts WHERE "userEmail"=$1';
    const result = await database.query(stmt, [req.body.userEmail]);
    // console.log(result);
    const email = result.rowCount;
    if (email > 0) {
      return res.status(406).send({
        success: 'true',
        status: 'Email Already Exist',
        auth: 'false',
      });
    }
    const stmt2 = 'SELECT "userId" FROM user_accounts WHERE "userName" = $1';
    const result2 = await database.query(stmt2, [req.body.userName]);
    console.log(result2);
    const name = result2.rowCount;
    if (name > 0) {
      return res.status(406).send({
        success: 'true',
        status: 'P8arcel Already Exist',
        auth: 'false',
      });
    }
    // Save User Data
    const hashedPassword = await bcrypt.hashSync(req.body.userPassword, 10);
    const newUser = await model.seeder(req, hashedPassword);
    const command = `INSERT INTO
      user_accounts("userName","userEmail","userPassword") VALUES($1,$2,$3) returning *`;
    const { rows } = await database.query(command, newUser);
    const token = await createToken(rows[0]);
    return res.status(201).send({
      success: 'true',
      status: 'User sent succesfully',
      auth: 'true',
      user: rows[0],
      token,
    });
  }

  async login(req, res) {
    const command = 'SELECT * FROM user_accounts WHERE "userEmail"=$1';
    const { rows } = await database.query(command, [req.body.userEmail]);
    if (!rows[0]) {
      return res.status(404).send({
        success: 'false',
        status: 'User Not Found in the Database, provide correct email and password',
      });
    }
    const passwordIsValid = await bcrypt.compareSync(req.body.userPassword, rows[0].userPassword);
    if (!passwordIsValid) return res.status(401).send({ auth: 'false', token: null });
    const newUser = rows[0];
    const token = await createToken(newUser);
    return res.status(200).send({
      auth: 'true', token, message: 'Login Successful', user: newUser,
    });
  }

  /**
        * Gets All user_accounts in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data
    */
  async getAllUsers(req, res) {
    const command = 'SELECT * FROM user_accounts';
    const { rows, rowCount } = await database.query(command);
    return res.status(200).send({
      success: 'true',
      status: 'Users Data retrieved successfully',
      user_accounts: rows,
      total_user_accounts: rowCount,
    });
  }

  /**
         * Gets a particular User in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
    */
  async getUser(req, res) {
    const command = 'SELECT * FROM user_accounts WHERE "userId"=$1';
    const { rows } = await database.query(command, [req.params.userId]);
    if (!rows[0]) {
      return res.status(404).send({
        success: 'false',
        status: 'User Not Found in the Database',
      });
    } return res.status(200).send({
      success: 'true',
      status: 'User retrieved successfully',
      User: rows[0],
    });
  }

  /**
    * Delete an User in the database
    *  @param {*} req - incomming request data
    * @param {*} res - response to the validity of the data
    */
  async deleteUser(req, res) {
    const deleteQuery = 'DELETE FROM user_accounts WHERE "userId"=$1 returning *';
    const { rows } = await database.query(deleteQuery, [req.params.userId]);
    if (!rows[0]) {
      return res.status(404).send({
        success: 'false',
        status: 'User Not Found in the Database',
      });
    }
    return res.status(200).send({
      success: 'true',
      status: 'User deleted successfuly',
    });
  }
}

const controller = new Controller();
export default controller;
