const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

//we'll require from the Operations module and name it dboper short for DBoperations
const dboper = require('./operations');

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        //We'll replace this call to the collection dboper.inserDocument
        // third argument will be 'campsites'
        // fourth argument will be a callback function that we'll define here inline. this is callback the gets called at the 
        //   end of the insert document methods definition in the operations module that we wrote
        // it only has one paramerter 'result' and it should contain the result from the insert operation.
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});