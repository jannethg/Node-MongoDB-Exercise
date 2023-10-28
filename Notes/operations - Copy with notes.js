const assert = require('assert').strict;

// Passing 4 callbacks
// create coll short for collection
//what were expecting here, the collection argument that's passed in will be a string like campsites for
// the we use that string as an argument in this db.collection method to obtain a reference to the collection name campsites
// that stored in the mongoDB server

// we can now use this coll constant to interact with a specific collection in the mongoDB server
// this first part will be all the same for all 4 methods. 

// use inserOne method will take 2 arguments: 
// First arg: document that will represent in the form of a javascript object
// Second arg: callback function that will define inline and it will have 2 parameters (err, result)
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        // to check if error is null, if null then we can keep going.  
        assert.strictEqual(err, null);

        //delivering result to this callback
        callback(result);
    });
};

// just list all the documents as we've done before 
// there is no use to find the document parameter so the "document" is removed from the callback method
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);

    //call that find with an empty() parameter list which will indicate that we want to find all documents
    // then we'll use the toArray method to find the array, then the toArray method is going to callback function 
    // 2 parameters of (err, doc)
    // in the body we'll assert that error is strictly equal to null
    
    // to check any error in converting the found documents to a javascript array.
    // if no error, then were going to take this doc array and run the callback(docs)
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};


// deleteOne with 2 arguments:  document, and callback function(err,result)
// first arg document: which we'll use to figure out which document to delete
// callback function were defining here in line will have the err and result parameter
// we'll check the error with an assert

//callback(result) - will give it the result from the deleteOne method which will be an object that has
// has some information about what was deleted
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};


// this will have an extra parameter called "update" in the callback method

// use the coll.updateOne method with 4 parameters
// first params: documents
// second params: $set:update operator - we'll use this update object to write over existing info
// third params: is for us to pass in certain optional configurations but you wont need so we'll just pass a null
// fourth params: callback function that will give us an error or the result of operation
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {

        //will check is not null with an assert
        assert.strictEqual(err, null);
        callback(result);
    });
};

// Notice that this are analogous to the four CRUD operations