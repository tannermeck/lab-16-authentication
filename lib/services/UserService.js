const Auth = require('../models/Auth.js');
const bcrypt = require('bcryptjs');


module.exports = class UserService {
  static async create({ email, password }){
    const priorUser = await Auth.getEmail(email);

    if (priorUser){
      throw new Error('User already exists for the email provided');
    }
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
    //why does this need to be an object?
    const newUser = await Auth.insert({ email, passwordHash });
    return newUser;
  }
  static async credential({ email, password }){
    const loggedIn = await Auth.getEmail(email);
    if (!loggedIn){
      throw new Error('Email/password incorrect');
    }
    const correctPassword = await bcrypt.compare(password, loggedIn.passwordHash);
    
    if (!correctPassword){
      throw new Error('Email/password incorrect');
    }
    //why do we return loggedIn
    return loggedIn;
  }
};
