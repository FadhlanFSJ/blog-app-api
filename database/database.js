import mysql from "mysql"

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog-app-pbkk'
})

export default db
