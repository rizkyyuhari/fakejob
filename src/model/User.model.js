const conn = require('../config/dbConnection')
const bcrypt = require('bcrypt')


exports.register = async (data,res) =>{
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password,salt);

    conn.query(
        `SELECT * FROM users WHERE LOWER(email) = ${conn.escape(data.email)}`,
        (err,result) =>{
            if(result.length) {
                return res.status(409).send({
                    error: 1,
                    message: "This user email is already in use!",
                  });
            }else {
                conn.query(
                    `INSERT INTO users (name, email, password) VALUES ('${
                      data.name
                    }', ${conn.escape(data.email)}, ${conn.escape(hashPassword)})`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        return res.status(500).send({
                          error: 1,
                          message: err,
                        });
                      }
                      return res.status(201).send({
                        error: 0,
                        message: "Register Succesfully",
                      });
                    }
                  );
            }
        }
    )
}