import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = express()

app.use((req, res) => res.end('Hi'))


if(!process.env.PORT) {
    throw new Error("No env variable port found")
}

app.listen(process.env.PORT, () => {
    console.log(`Application started on PORT ${process.env.PORT}`)
})