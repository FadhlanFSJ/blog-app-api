import express from "express"
import authRoute from './router/auth.js'
import postRoute from './router/posts.js'
import userRoute from './router/users.js'
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute)
app.use("/api/users", postRoute)
app.use("/api/posts", userRoute)

app.listen(8800, () => {
    console.log('Connected with port 8800!!!')
})