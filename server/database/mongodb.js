import mongodb from "mongodb";
import dotenv from "dotenv";

async function returnContactsCollection() {
  dotenv.config();

  const { MongoClient } = mongodb;

  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    try {
      await client.connect();
    } catch (error) {
      res.status(500).jjson({ message: "Internal Server Error" });
    }

    const database = client.db();
    const contactsCollection = database.collection("contacts", {
      autoCreate: true,
    });

    return contactsCollection;
  } catch (error) {
    res.status(500).json({ message: "An Error Occured" });
  }
}

export default { returnContactsCollection};
