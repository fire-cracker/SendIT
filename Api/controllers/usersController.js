// Import statments
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import database from '../db/config';

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
    const name = result2.rowCount;
    if (name > 0) {
      return res.status(406).send({
        success: 'true',
        status: 'Username Already Exist',
        auth: 'false',
      });
    }
    // Save User Data
    const {
      userName, userEmail, userPassword,
    } = req.body;
    const hashedPassword = await bcrypt.hashSync(userPassword, 10);
    const newUser = [userName, userEmail, hashedPassword];
    const command = `INSERT INTO
      user_accounts("userName","userEmail","userPassword") VALUES($1,$2,$3) returning *`;
    const { rows } = await database.query(command, newUser);
    const token = await createToken(rows[0]);
    return res.status(201).send({
      success: 'true',
      status: 'User sent succesfully',
      auth: 'true',
      user: {
        userName: rows[0].userName,
        userEmail: rows[0].userEmail,
        userId: rows[0].userId,
      },
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
      auth: 'true',
      token,
      message: 'Login Successful',
      user: {
        userName: newUser.userName,
        userEmail: newUser.userEmail,
        userId: newUser.userId,
      },
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
}

const controller = new Controller();
export default controller;
