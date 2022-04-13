import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    //we use transcation because for e.g if query is always executed as a whole and that if some part of the query should fail, the entire query
    // is rolled back so that you can't end up with corrupted data in your db
    //lat = latitude, lng = longitude
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                //success
                () => {
                    resolve();
                },
                //error
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //to prevent SQLinjection we will pass as values ? for data that we need
            tx.executeSql(`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                [title, imageUri, address, lat, lng],
                //success
                (_, result) => {
                    resolve(result);
                },
                //error
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //to prevent SQLinjection we will pass as values ? for data that we need
            tx.executeSql('SELECT * FROM places',
                [],
                //success
                (_, result) => {
                    resolve(result);
                },
                //error
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};