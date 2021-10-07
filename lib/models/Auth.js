const pool = require('../utils/pool');


module.exports = class Auth {
  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.password = row.password_hash;
  }

  static async insert({ email, password }){
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, password]
    );
    return new Auth(rows[0]);
  }

  toJSON(){
    return {
      id: this.id,
      email: this.email
    };
  }
};
