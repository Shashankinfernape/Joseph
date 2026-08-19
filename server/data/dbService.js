const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

function getDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return {};
  }
}

function saveDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing database file:', error);
    return false;
  }
}

function updateCollection(collectionName, updater) {
  const db = getDB();
  if (!db[collectionName]) {
    db[collectionName] = [];
  }
  const result = updater(db[collectionName], db);
  saveDB(db);
  return result;
}

module.exports = {
  getDB,
  saveDB,
  updateCollection
};
