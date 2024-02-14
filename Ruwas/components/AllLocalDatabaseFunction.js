import LocalDb from "../DataBaseHandle/LocalDb";
export const createTable = (columns) => {
  return new Promise((resolve, reject) => {
    const tableName = columns.tableName;
    const columnDefinitions = [];
    Object.keys(columns).forEach((dataType) => {
      if (dataType !== "tableName") {
        columns[dataType].forEach((columnName) => {
          columnDefinitions.push(`${columnName} ${dataType}`);
        });
      }
    });
    const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columnDefinitions.join(
      ", "
    )})`;

    LocalDb.transaction(
      (tx) => {
        tx.executeSql(
          createTableSQL,
          [],
          () => resolve(`Table '${tableName}' created successfully`),
          (error) =>
            reject(`Error creating table '${tableName}': ${error.message}`)
        );
      },
      (error) => reject(`Transaction error: ${error.message}`)
    );
  });
};
export const insertDataArray = (dataObject) => {
  const tableName = dataObject.tableName;
  const columnNames = dataObject.TEXT;
  const valuePlaceholders = columnNames.map(() => "?").join(", ");

  const totalRows = dataObject.table.length;
  let rowsInserted = 0;

  dataObject.table.forEach((data, index) => {
    const columnValues = Object.values(data);

    const insertDataSQL = `INSERT INTO ${tableName} (${columnNames.join(
      ", "
    )}) VALUES (${valuePlaceholders})`;

    LocalDb.transaction((tx) => {
      tx.executeSql(
        insertDataSQL,
        columnValues,
        () => {
          rowsInserted++;
          if (rowsInserted === totalRows) {
            console.log(
              `${rowsInserted} Data inserted successfully to ${tableName} table`
            );
          }
        },
        (error) => console.error("Error inserting data:", error)
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
          (error) =>
            reject(
              `Error retrieving data from '${tableName}': ${error.message}`
            )
          // (error) => resolve(undefined)
        );
      },
      (error) => reject(`Transaction error: ${error.message}`)
    );
  });
};

export const retrieveDataById = (tableName, id) => {
  return new Promise((resolve, reject) => {
    const retrieveDataSQL = `SELECT * FROM ${tableName} WHERE id = ?`; // Assuming the primary key column is named 'id'

    LocalDb.transaction(
      (tx) => {
        tx.executeSql(
          retrieveDataSQL,
          [id], // Pass the ID as a parameter to avoid SQL injection
          (_, result) => resolve(result.rows._array),
          (error) =>
            reject(
              `Error retrieving data from '${tableName}' with ID ${id}: ${error.message}`
            )
        );
      },
      (error) => reject(`Transaction error: ${error.message}`)
    );
  });
};

export const doesTableExist = (tableName) => {
  return new Promise((resolve, reject) => {
    const checkTableSQL = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;

    LocalDb.transaction(
      (tx) => {
        tx.executeSql(
          checkTableSQL,
          [tableName],
          (tx, result) => {
            if (result.rows.length > 0) {
              resolve(true); // Table exists
            } else {
              resolve(false); // Table does not exist
            }
          },
          (error) => reject(`Error checking table existence: ${error.message}`)
        );
      },
      (error) => reject(`Transaction error: ${error.message}`)
    );
  });
};

export const deletetable = (tableName) => {
  return new Promise((resolve, reject) => {
    LocalDb.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName};`,
        [],
        (_, results) => {
          console.log(`Table '${tableName}' removed successfully`);
          resolve(`Table '${tableName}' removed successfully`);
        },
        (_, error) => {
          console.error(
            `Error removing table '${tableName}': ${error.message}`
          );
          reject(`Error removing table '${tableName}': ${error.message}`);
        }
      );
    });
  });
};

export const updateMasterData = async (tableRow) => {
  return new Promise((resolve, reject) => {
    LocalDb.transaction(
      (tx) => {
        tableRow.forEach((row) => {
          const {
            Sno,
            quarteSelected,
            quarterAchieved,
            quarterComment,
            quarterExpenditure,
            workplanid,
          } = row;
          const updateQuery = `UPDATE masterData 
                                         SET 
                                            quarter${quarteSelected} = ?,
                                            quarter${quarteSelected}Achieved = ?,
                                            quarter${quarteSelected}Comment = ?,
                                            quarter${quarteSelected}Expenditure = ?
                                         WHERE 
                                            workplanid = ? 
                                            AND Sno = ?`;
          tx.executeSql(
            updateQuery,
            [
              quarterAchieved,
              quarterComment,
              quarterExpenditure,
              workplanid,
              Sno,
            ],
            (_, result) => {
              // Check if rows affected to verify if the update was successful
              if (result.rowsAffected > 0) {
                console.log(
                  `Row updated for Sno: ${Sno}, workplanid: ${workplanid}`
                );
              } else {
                console.log(
                  `No rows updated for Sno: ${Sno}, workplanid: ${workplanid}`
                );
              }
            },
            (_, error) => {
              console.error("Error updating row:", error);
              reject(error);
            }
          );
        });
      },
      (error) => {
        console.error("Transaction error:", error);
        reject(error);
      },
      () => {
        resolve("All rows updated successfully");
      }
    );
  });
};

export const updateMasterDataUniqueKey = async (
  tableName,
  tableRow,
  uniqueKeys
) => {
  return new Promise((resolve, reject) => {
    LocalDb.transaction(
      (tx) => {
        tableRow.forEach((row) => {
          const {
            Sno,
            quarteSelected,
            quarterAchieved,
            quarterComment,
            quarterExpenditure,
            workplanid,
          } = row;
          const uniqueKeyConditions = uniqueKeys
            .map((key) => `${key} = ?`)
            .join(" AND ");
          const updateQuery = `UPDATE ${tableName} 
                                         SET 
                                            quarter${quarteSelected} = ?,
                                            quarter${quarteSelected}Achieved = ?,
                                            quarter${quarteSelected}Comment = ?,
                                            quarter${quarteSelected}Expenditure = ?
                                         WHERE 
                                            ${uniqueKeyConditions}`;
          const values = [
            quarterAchieved,
            quarterComment,
            quarterExpenditure,
            ...uniqueKeys.map((key) => row[key]),
          ];
          tx.executeSql(
            updateQuery,
            values,
            (_, result) => {
              // Check if rows affected to verify if the update was successful
              if (result.rowsAffected > 0) {
                console.log(
                  `Row updated for ${uniqueKeys
                    .map((key) => `${key}: ${row[key]}`)
                    .join(", ")}`
                );
              } else {
                console.log(
                  `No rows updated for ${uniqueKeys
                    .map((key) => `${key}: ${row[key]}`)
                    .join(", ")}`
                );
              }
            },
            (_, error) => {
              console.error("Error updating row:", error);
              reject(error);
            }
          );
        });
      },
      (error) => {
        console.error("Transaction error:", error);
        reject(error);
      },
      () => {
        resolve("All rows updated successfully");
      }
    );
  });
};
