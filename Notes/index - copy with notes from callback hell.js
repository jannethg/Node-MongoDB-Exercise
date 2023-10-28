const MongoClient = require('mongodb').MongoClient;
// we no longer need the asserts here either.
// const assert = require('assert').strict;
// Promises has a built in error handling already. 
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

// we can add the .then method and if it resolves, it will return to use the client as the resolved value
// The Promise takes the callback function as its parameter
MongoClient.connect(url, { useUnifiedTopology: true }).then (client => {



    console.log('Connected correctly to server');

    const db = client.db(dbname);

    // we'll remove the callback definition which means that this method now returns a promise and we chain a '.then' method to it
    // .then receives the result from the promise

    // we'll remove the assert but we still consolelog the results


    db.dropCollection('campsites')
       .then(result => {
        console.log('Dropped Collection:', result);
       })
       // we'll add a catch block if a collection name campsites does not exits in this database
       // then this promise will return with an error
       // we'll console.log this error but we wont close the connection. 
       .catch(err => console.log('No Collection to drop.'));

       //we'll remove the callback argument and add a then method 
       dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
        .then(result => {
            console.log('Insert Document:', result.ops);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                { description: "Updated Test Description" }, 'campsites');
        })
        .then(result => {
            console.log('Updated Document Count:', result.result.nModified);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                'campsites');
        })
        .then(result => {
            console.log('Deleted Document Count:', result.deletedCount);

            return client.close();
        })
        .catch(err => {
            console.log(err);
            //close the client here. 
            client.close();
        });
    })
//each of these result operations waiting to resolve then continuing on with the next....

//This structure is a lot easier to follow. 

//we'll chain the catch method here, which as you learned in the lesson on promises. Is the method that will
//run if the promise rejects. It will automatically receives this error object and console.log its contents
.catch (err => console.log(err));