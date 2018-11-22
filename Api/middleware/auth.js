import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyUserToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) { return res.status(403).send({ auth: 'false', message: 'No token provided' }); }
  await jwt.verify(token, process.env.User_Secret, (err, decoded) => {
    if (err) { return res.status(500).send({ auth: 'false', message: 'Failed to authenticate token' }); }
    // update body with the Id
    req.body.userId = decoded.userId;
    req.body.userRole = decoded.userRole;
    req.body.userEmail = decoded.userEmail;
    req.body.userName = decoded.userName;
    return next();
  });
}

export function verifyAdmin(req, res, next) {
  if (req.body.userRole !== 'Admin') {
    return res.status(401).send({ success: 'false', Message: 'Forbidden Route, User not Authorised' });
  }
  return next();
}
