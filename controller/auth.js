import db from '../database/database.js'
import bcrypt from 'bcryptjs'

export const register = (req, res) => {
    //Check Users Existing
    const query = "SELECT * FROM users WHERE email = ? username = ?";
    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err)
        if (data.lenght) return res.status(409).json("User Already exist!");
        //Hash the password

        const salt = bcrypt.getSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(q, [values], (err, data) => {
            if (err) res.json(err)
            return res.status(200).json("Berhasil menambahkan users!")
        })
    })
}
export const login = (req, res) => {

}
export const logout = (req, res) => {

}