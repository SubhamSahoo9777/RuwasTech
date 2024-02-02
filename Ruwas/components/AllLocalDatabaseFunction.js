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
    const tableName = dataObject.tableName; // Use dataObject.tableName instead of dataObject.table
    const columnNames = dataObject.TEXT;
    const valuePlaceholders = columnNames.map(() => '?').join(', ');

    dataObject.table.forEach((data) => {
        const columnValues = Object.values(data);

        const insertDataSQL = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES (${valuePlaceholders})`;

        LocalDb.transaction((tx) => {
            tx.executeSql(
                insertDataSQL,
                columnValues,
                () => console.log('Data inserted successfully'),
                (error) => console.error('Error inserting data:', error)
            );
        });
    });
};


