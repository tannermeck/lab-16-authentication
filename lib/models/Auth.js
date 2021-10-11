const jwt = require('jsonwebtoken');
const pool = require('../utils/pool');
const Role = require('./Role');


module.exports = class Auth {

  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.role = row.role;
  }

  static async getEmail(email){
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = ($1)',
      [email]
    );
    if (!rows[0]) return null;
    const permission = await Role.findById(rows[0].role_id);
    return new Auth({ ...rows[0], role: permission.title });
  }

  static async insert(email, passwordHash, roleTitle){
    const permission = await Role.findByTitle(roleTitle);
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, role_id) VALUES ($1, $2, $3) RETURNING *',
      [email, passwordHash, permission.id]
    );
    return new Auth({ ...rows[0], role: permission.title });
  }

  static async getUser(id){
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE users.id = ($1)',
      [id]
    );
    return new Auth(rows[0]);
  }
  
  authToken() {
    return jwt.sign(this.toJSON(), process.env.AUTH_SECRET, {
      expiresIn: '12h',
    });
  }
  toJSON(){
    return {
      id: this.id,
      role: this.role,
    };
  }
};
