import { Express } from "express";

export default async function RegisterRoutes(app: Express) {
    //register routes
    console.log()
    app.use((req, res) => res.end('Hi'))

}