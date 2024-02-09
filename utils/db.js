import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;

function connectDB() {
    console.log('Connecting to the SQLite database...');
    const db = new (verbose().Database)('/data/example.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the SQLite database.');
    });
    return db;
}

export { connectDB };