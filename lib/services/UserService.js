const Auth = require('../models/Auth.js');
const bcrypt = require('bcryptjs');


module.exports = class UserService {
  static async create({ email, password }){
    const priorUser = await Auth.getEmail(email);

    if (priorUser){
      throw new Error('User already exists for the email provided');
    }
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
    const newUser = await Auth.insert({ email, passwordHash });
    return newUser;
  }
};
