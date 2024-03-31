const APP_DB_USER = 'appuser-njs-events';
const APP_DB_PSWD = 'violfsyd';

import { MongoClient } from 'mongodb';

function getURI(usr, pswd, db='') {
  return `mongodb+srv://${usr}:${pswd}@cluster0.6d3uux0.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;
}

export async function connectToDB(db) {
  const client = await MongoClient.connect(
    getURI(APP_DB_USER, APP_DB_PSWD, db)
  );
  return client;
}

export async function insertDocumentToCollection(client, collection, document) {
  const db = client.db();
  const resp = await db.collection(collection).insertOne({
    ...document
  });
  return resp;
}

export async function getAllDocumentsFromCollection(client, collection, filter={}) {
  const db = client.db();
  const eventcomments = await db.collection(collection).find(filter).toArray();
  return eventcomments;
}

