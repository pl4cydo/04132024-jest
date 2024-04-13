import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

interface movie {
    title: string,
    year: number,
}

dotenv.config();
 
const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

async function seedDataBase() {
    try {
        await client.connect()
        console.info("Conectado ao mongo")

        const db = client.db("TestDB")
        const collection = db.collection("Movies")
        const documents: movie[] = []

        for ( let i = 0; i < 50; i++ ) {
            const document: movie = {
                title: `movie ${i + 1}`,
                year: 1990 + i
            }
            documents.push(document)
        }

        const result = await collection.insertMany(documents)
        console.log("Teste de documento funcional \n" + result)
    } catch (err) {
        console.error("Erro na conexão ou inserção:", err);
    } finally {
        await client.close();
        console.log("Conexão com o MongoDB fechada")
    }
}

seedDataBase()