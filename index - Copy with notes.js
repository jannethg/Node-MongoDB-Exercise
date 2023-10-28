//Require the MongoDB nodejs driver and imported the MongoClient
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

// We use the MongoClient.connect method in order to make a connection to the MongoDB Server
// the connect method callback gave to use a (client) object that we then use to acess
// the nuCampsite database
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    //We deleted or dropped the campsites collection from the  database and ...
    //drop mean it will remove permantly!
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //we recreate campsites collection then...
        const collection = db.collection('campsites');

        //Inserted a new Document into the campsite's colleciton (collection.insertOne)
        // two callback functions (err, result)
        // check error has occured using the (assert.strictEqual method)
        // result.ops - Ops short for Operations
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

           // We use the collection.find method and along with toArray method to return all the documents from the campsite's collection.
           // toArray methods (err, docs)
           // assert.strictEqual to search for error
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                //then we close the client....
                client.close();
            });
        });
    });
});

//Then. We handle any errors using the node error callback convention.
// and we use the assert core module to stop the application if any errors occured. 