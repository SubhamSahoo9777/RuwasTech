import  LocalDb from '../DataBaseHandle/LocalDb'
export const createTable = (columns) => {
    return new Promise((resolve, reject) => {
        const tableName = columns.tableName;
        const columnDefinitions = [];
        Object.keys(columns).forEach((dataType) => {
            if (dataType !== 'tableName') {
                columns[dataType].forEach((columnName) => {
                    columnDefinitions.push(`${columnName} ${dataType}`);
                });
            }
        });
        const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columnDefinitions.join(', ')})`;

        LocalDb.transaction(
            (tx) => {
                tx.executeSql(
                    createTableSQL,
                    [],
                    () => resolve(`Table '${tableName}' created successfully`),
                    (error) => reject(`Error creating table '${tableName}': ${error.message}`)
                );
            },
            (error) => reject(`Transaction error: ${error.message}`)
        );
    });
};
export const insertDataArray = (dataObject) => {
    const tableName = dataObject.tableName;
    const columnNames = dataObject.TEXT;
    const valuePlaceholders = columnNames.map(() => '?').join(', ');

    const totalRows = dataObject.table.length;
    let rowsInserted = 0;

    dataObject.table.forEach((data, index) => {
        const columnValues = Object.values(data);

        const insertDataSQL = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES (${valuePlaceholders})`;

        LocalDb.transaction((tx) => {
            tx.executeSql(
                insertDataSQL,
                columnValues,
                () => {
                    rowsInserted++;
                    if (rowsInserted === totalRows) {
                        console.log(`${rowsInserted} Data inserted successfully to ${tableName} table`);
                    }
                },
                (error) => console.error('Error inserting data:', error)
            );
        });
    });
};

export const retrieveData = (tableName) => {
    return new Promise((resolve, reject) => {
        const retrieveDataSQL = `SELECT * FROM ${tableName}`;

        LocalDb.transaction(
            (tx) => {
                tx.executeSql(
                    retrieveDataSQL,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (error) => reject(`Error retrieving data from '${tableName}': ${error.message}`)
                );
            },
            (error) => reject(`Transaction error: ${error.message}`)
        );
    });
};

