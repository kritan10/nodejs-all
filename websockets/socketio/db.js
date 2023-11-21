import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// open the database file
const db = await open({
	filename: 'chat.db',
	driver: sqlite3.Database,
});

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
  );
`);

/**
 * This function saves incoming user messages in the database. The offset is calculated by the auto increment id of the message.
 * @param {string} msg
 * @returns the insertId of the message
 */
async function saveMessage(msg, clientOffset) {
	let result;
	try {
		// store the message in the database
		result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?,?)', [msg, clientOffset]);
	} catch (e) {
		if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
			return 'duplicate';
		}
		// TODO handle the failure
		return false;
	}
	return result;
}

export { db, saveMessage };
