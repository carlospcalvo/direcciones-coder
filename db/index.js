import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('address.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS addresses (
					id INTEGER PRIMARY KEY NOT NULL,
					title TEXT NOT NULL,
					image TEXT NOT NULL,
					address TEXT NOT NULL,
					lat REAL NOT NULL,
					lng REAL NOT NULL
				);`,
				[],
				() => resolve(),
				(_, err) => reject(err)
			)
		})
	});

	return promise;
}

export const insertAddress = (title, image, address, lat, lng) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`INSERT INTO addresses (title, image, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
				[title, image, address, lat, lng],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});

	return promise;
}

export const getAddresses = () => {
	const promise = new Promise((resolve, reject) => {
	  db.transaction(tx => {
		tx.executeSql(
		  'SELECT * FROM addresses;',
		  [],
		  (_, result) => resolve(result),
		  (_, err) => reject(err),
		);
	  });
	});
  
	return promise;
}

export const deleteAddress = id => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'DELETE FROM addresses WHERE id = ?;',
				[id],
				(_, result) => resolve(result),
		  		(_, err) => reject(err)
			);
		});
	});

	return promise;
}