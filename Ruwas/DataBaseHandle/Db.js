import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("WSDB.db");

export default db;