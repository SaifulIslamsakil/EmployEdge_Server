const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
// pHOEy6ro4kyNFoVL
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://Saiful_islam:pHOEy6ro4kyNFoVL@employedge.q6bjvow.mongodb.net/?retryWrites=true&w=majority&appName=EmployEdge";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        const UserCollection = client.db("EmployEdge").collection("User")
        const AddWorkCollection = client.db("EmployEdge").collection("Work")
        app.post("/user", async (req, res) => {
            const userInfo = req.body
            const quray = { email: userInfo?.email }
            const find = await UserCollection.findOne(quray)
            if (find) {
                return
            }
            const result = await UserCollection.insertOne(userInfo)
            res.send(result)
            console.log(userInfo)
        })
        app.get("/EmployeeList", async (req, res) => {
            const quray = { role: "Employee" }
            const result = await UserCollection.find(quray).toArray()
            res.send(result)
        })
        app.put("/Verified/:id", async (req, res) => {
            const id = req.params.id
            const quray = { _id: new ObjectId(id) }
            const update = {
                $set: {
                    Verified: true
                }
            }
            const result = await UserCollection.updateOne(quray, update)
            res.send(result)
        })
        app.get("/allEmployeeList", async (req, res) => {
            const result = await UserCollection.find().toArray()
            res.send(result)
        })
        app.put("/firehr/:id", async (req, res)=>{
            const id = req.params.id
            const quray = {_id: new ObjectId(id)}
            const update ={
                $set:{
                    role:"Employee"
                }
            }
            const result = await UserCollection.updateOne(quray, update)
            res.send(result)
        })
        app.put("/makeHr/:id", async (req, res)=>{
            const id = req.params.id
            const quray = {_id: new ObjectId(id)}
            const update ={
                $set:{
                    role:"HR"
                }
            }
            const result = await UserCollection.updateOne(quray, update)
            res.send(result)
        })
        app.post("/addWork", async(req,res)=>{
            const workInfo = req.body
            const result = await AddWorkCollection.insertOne(workInfo)
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("EmployEdge is runing")
})
app.listen(port, () => {
    console.log(`EmployEdge runing on port ${port}`)
})
