const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key/firebase-service-account.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };