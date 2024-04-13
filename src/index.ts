// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

interface movie {
    title: string,
    year: number,
}

dotenv.config();

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ text: "opa" });
});

app.get("/movies/list", async (req: Request, res: Response) => {

    let result: movie[]

    try {
        await client.connect()
        console.info("Conectado ao mongo")

        const db = client.db("TestDB")
        const collection = db.collection("Movies")

        result = await collection.find().toArray()
      
        res.json(result);
        
    } catch (err) {
        console.error("Erro na conexão ou inserção:", err);
    } finally {
        await client.close();
        console.log("Conexão com o MongoDB fechada")
    }

});
  
 
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});