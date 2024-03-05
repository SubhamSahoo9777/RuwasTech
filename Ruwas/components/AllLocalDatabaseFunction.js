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

export const updateWorkplanModalActivity = (objectToUpdate) => {
  const {
    Sno,
    modelActivity,
    quarteSelected,
    quarterAchieved,
    quarterExpenditure,
    quarterComment,
    ...rest
  } = objectToUpdate;

  let quarterFieldToUpdate = "";
  switch (quarteSelected) {
    case "1":
      quarterFieldToUpdate = {
        quarterOneAchieved: quarterAchieved,
        quarterOneExpenditure: quarterExpenditure,
        quarterOneComment: quarterComment,
      };
      break;
    case "2":
      quarterFieldToUpdate = {
        quarterTwoAchieved: quarterAchieved,
        quarterTwoExpenditure: quarterExpenditure,
        quarterTwoComment: quarterComment,
      };
      break;
    case "3":
      quarterFieldToUpdate = {
        quarterThreeAchieved: quarterAchieved,
        quarterThreeExpenditure: quarterExpenditure,
        quarterThreeComment: quarterComment,
      };
      break;
    case "4":
      quarterFieldToUpdate = {
        quarterFourAchieved: quarterAchieved,
        quarterFourExpenditure: quarterExpenditure,
        quarterFourComment: quarterComment,
      };
      break;
    default:
      console.error("Invalid quarter selected:", quarteSelected);
      return;
  }

  const fieldsToUpdate = { ...quarterFieldToUpdate, ...rest };

  LocalDb.transaction(
    (tx) => {
      tx.executeSql(
        `UPDATE workplanModalActivity SET ${Object.keys(fieldsToUpdate)
          .map((key) => `${key} = ?`)
          .join(", ")} WHERE Sno = ? AND modelActivity = ?`,
        [...Object.values(fieldsToUpdate), Sno, modelActivity],
        (_, result) => {
          console.log("Data updated successfully");
        },
        (_, error) => {
          console.error("Error updating data:", error);
        }
      );
    },
    (error) => console.error("Transaction error:", error)
  );
};

export const retrieveDataById = (tableName, id) => {
  return new Promise((resolve, reject) => {
    const retrieveDataSQL = `SELECT * FROM ${tableName} WHERE mid = ?`; // Assuming the primary key column is named 'id'

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

    LocalLocalDb.transaction(
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
    LocalLocalDb.transaction((tx) => {
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

const numberToWordMap = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  // Add more mappings as needed
};

export const updateMasterDataUniqueKey1 = async (
  tableName,
  tableRow,
  uniqueKeys
) => {
  // Function to convert quarterSelected values to words
  const convertQuarterToWord = (value) => {
    return numberToWordMap[value] || value;
  };

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

          // Convert quarterSelected value to word
          const quarterSelectedWord = convertQuarterToWord(quarteSelected);

          // Define unique key conditions
          const uniqueKeyConditions = uniqueKeys
            .map((key) => `${key} = ?`)
            .join(" AND ");

          // Use the word in your query
          const updateQuery = `UPDATE ${tableName} 
                                       SET 
                                          quarter${quarterSelectedWord} = ?,
                                          quarter${quarterSelectedWord}Achieved = ?,
                                          quarter${quarterSelectedWord}Comment = ?,
                                          quarter${quarterSelectedWord}Expenditure = ?
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
export const updateMasterDataUniqueKey2 = async (
  tableName,
  tableRow,
  uniqueKeys
) => {
  const updatedRows = []; // Array to collect updated rows

  // Function to convert quarterSelected values to words
  const convertQuarterToWord = (value) => {
    return numberToWordMap[value] || value;
  };

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

          // Convert quarterSelected value to word
          const quarterSelectedWord = convertQuarterToWord(quarteSelected);

          // Define unique key conditions
          const uniqueKeyConditions = uniqueKeys
            .map((key) => `${key} = ?`)
            .join(" AND ");

          // Use the word in your query
          const updateQuery = `UPDATE ${tableName} 
                                       SET 
                                          quarter${quarterSelectedWord} = ?,
                                          quarter${quarterSelectedWord}Achieved = ?,
                                          quarter${quarterSelectedWord}Comment = ?,
                                          quarter${quarterSelectedWord}Expenditure = ?
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
              if (result.rowsAffected > 0) {
                // Retrieve updated row from the database and push it to the array
                tx.executeSql(
                  `SELECT * FROM ${tableName} WHERE ${uniqueKeyConditions}`,
                  uniqueKeys.map((key) => row[key]),
                  (_, resultSet) => {
                    if (resultSet.rows.length > 0) {
                      updatedRows.push(resultSet.rows.item(0)); // Add the updated row to the array
                    }
                  }
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
        resolve(updatedRows); // Resolve the promise with the array of updated rows
      }
    );
  });
};
export const updateMasterDataUniqueKey3 = async (
  tableName,
  tableRow,
  uniqueKeys
) => {
  const updatedRows = []; // Array to collect updated rows

  // Function to convert quarterSelected values to words
  const convertQuarterToWord = (value) => {
    return numberToWordMap[value] || value;
  };

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

          // Convert quarterSelected value to word
          const quarterSelectedWord = convertQuarterToWord(quarteSelected);

          // Define unique key conditions
          const uniqueKeyConditions = uniqueKeys
            .map((key) => `${key} = ?`)
            .join(" AND ");

          // Use the word in your query
          const updateQuery = `UPDATE ${tableName} 
                                       SET 
                                          quarter${quarterSelectedWord} = ?,
                                          quarter${quarterSelectedWord}Achieved = ?,
                                          quarter${quarterSelectedWord}Comment = ?,
                                          quarter${quarterSelectedWord}Expenditure = ?
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
              if (result.rowsAffected > 0) {
                // Retrieve updated row from the database and push it to the array
                tx.executeSql(
                  `SELECT * FROM ${tableName} WHERE ${uniqueKeyConditions}`,
                  uniqueKeys.map((key) => row[key]),
                  (_, resultSet) => {
                    if (resultSet.rows.length > 0) {
                      updatedRows.push(resultSet.rows.item(0)); // Add the updated row to the array
                      console.log(
                        `Row updated for ${uniqueKeys
                          .map((key) => `${key}: ${row[key]}`)
                          .join(", ")}`
                      );
                    }
                  }
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
        if (updatedRows.length > 0) {
          resolve(updatedRows); // Resolve the promise with the array of updated rows
        } else {
          resolve("No rows updated");
        }
      }
    );
  });
};

export const insertDataArray2 = (dataObject) => {
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
export const createTable1 = (tableName, columns) => {
  return new Promise((resolve, reject) => {
    const columnDefinitions = [];
    Object.keys(columns).forEach((dataType) => {
      columns[dataType].forEach((columnName) => {
        columnDefinitions.push(`${columnName} ${dataType}`);
      });
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
// New function to update sync status
export const updateSyncStatus = (userId, newSyncStatus, rowId) => {
  return new Promise((resolve, reject) => {
    const updateSyncStatusSQL = `UPDATE UserSavedData SET SYNC = ? WHERE USERID = ? AND id = ?`;

    LocalDb.transaction(
      (tx) => {
        tx.executeSql(
          updateSyncStatusSQL,
          [newSyncStatus, userId, rowId],
          (_, result) =>
            resolve(
              `Sync status updated successfully for USERID: ${userId}, id: ${rowId}`
            ),
          (error) => reject(`Error updating sync status: ${error.message}`)
        );
      },
      (error) => reject(`Transaction error: ${error.message}`)
    );
  });
};

export const deleteRowById = (tableName, rowId) => {
  return new Promise((resolve, reject) => {
    const deleteRowSQL = `DELETE FROM ${tableName} WHERE id = ?`;

    LocalDb.transaction(
      (tx) => {
        tx.executeSql(
          deleteRowSQL,
          [rowId],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(`Row with ID ${rowId} deleted successfully from ${tableName}`);
            } else {
              reject(`No rows deleted from ${tableName} with ID ${rowId}`);
            }
          },
          (error) => reject(`Error deleting row from ${tableName}: ${error.message}`)
        );
      },
      (error) => reject(`Transaction error: ${error.message}`)
    );
  });
};
export const updateRecord = (id, newValue) => {
  LocalDb.transaction(
    tx => {
      tx.executeSql(
        `UPDATE UserSavedData SET USERSAVEDATA = ? WHERE id = ?`,
        [newValue, id],
        (_, results) => {
          console.log('Rows affected:', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Update successful');
          } else {
            console.log('Update failed');
          }
        },
        (_, error) => {
          console.log('Error updating record:', error);
        }
      );
    },
    error => {
      console.log('Transaction error:', error);
    }
  );
};
