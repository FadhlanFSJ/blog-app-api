import db from '../database/database.js'
import bcrypt from 'bcryptjs'
import { jwt } from 'jsonwebtoken';

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
    //Check User

    const q = 'SELECT * FROM users WHERE users = ?'
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.lenght === 0) return res.status(404).json("User Not Found!")

        //Check Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong Username/Password");

        const token = jwt.sign({ id: data[0].id }, "jwtkey")
        const { password, ...other } = data[0]
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })


}
export const logout = (req, res) => {

}