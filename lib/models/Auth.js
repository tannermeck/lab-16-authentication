const pool = require('../utils/pool');


module.exports = class Auth {
  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  static async insert({ email, passwordHash }){
    const { rows } = await pool.query(
      'INSERT INTO users (email, passwordHash) VALUES ($1, $2) RETURNING *',
      [email, passwordHash]
    );
    return new Auth(rows[0]);
  }

};
