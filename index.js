const express = require('express'); const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const app = express();
const port = process.env.PORT || 3000;


// middleware 

app.use(cors({
  origin: [
    "http://localhost:5173",
     "https://travelease-vehicle-booking.vercel.app"
     
  ],
  credentials: true
}

));
app.use(express.json());

// travelEase-db
// kcxGldchOd5mElht

// const uri = "mongodb+srv://travelEase-db:kcxGldchOd5mElht@cluster0.hdnectc.mongodb.net/?appName=Cluster0";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hdnectc.mongodb.net/?appName=Cluster0`;

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
   
    const db = client.db('model-db')
    const modelCollection = db.collection('models')
    const bookingsCollection = db.collection('bookings');

    // app.get('/models', async(req, res) => {

    //   const result = await modelCollection.find().toArray()

    //   res.send(result)
    // })


    app.get('/models', async (req, res) => {
  const { userEmail } = req.query; 
  let query = {};
  if (userEmail) {
    query.userEmail = userEmail;
  }

  try {
    const result = await modelCollection.find(query).toArray();
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch vehicles" });
  }
});



    app.get('/models/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await modelCollection.findOne({ _id: new ObjectId(id) });
    if (!vehicle) return res.status(404).send({ message: "Vehicle not found" });
    res.send(vehicle);
  } catch (err) {
    res.status(500).send({ message: "Invalid ID or server error" });
  }
});


app.post('/models', async (req, res) => {
  const vehicle = req.body;
  try {
    const result = await modelCollection.insertOne(vehicle);
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to add vehicle" });
  }
});



  // Book a vehicle
    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      try {
        const result = await bookingsCollection.insertOne(booking);
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Booking failed" });
      }
    });

    // Get bookings of a user
    app.get('/myBookings', async (req, res) => {
      const email = req.query.email;
      try {
        const bookings = await bookingsCollection.find({ userEmail: email }).toArray();
        res.send(bookings);
      } catch (err) {
        res.status(500).send({ message: "Failed to fetch bookings" });
      }
    });


    // Update vehicle
app.put('/models/:id', async (req, res) => {
  const { id } = req.params;
  const updatedVehicle = req.body;

  try {
    const result = await modelCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedVehicle }
    );

    if (result.matchedCount === 0)
      return res.status(404).send({ message: "Vehicle not found" });

    res.send({ message: "Vehicle updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to update vehicle" });
  }
});


// Delete vehicle
app.delete('/models/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await modelCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Vehicle not found" });
    }

    res.send({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to delete vehicle" });
  }
});



//     console.log("MongoDB connected successfully!");
//   } finally {
//     // await client.close();
//   }
// }



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('TravelEase server is running')
})









app.listen(port, () => {

  console.log(`TravelEase server is runnig on port: ${port}`)
});