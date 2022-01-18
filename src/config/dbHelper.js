var { DateTime } = require('luxon');

async function connect() {
    if (global.connection && global.connection.state !== "disconnected") {
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host     : "localhost",
        port     : 3306,
        user     : "root",
        password : "mysqlpwd",
        database : "URLSHORTENER"
    });
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectURLs(byid, bydate,byshortener) {
    const conn = await connect();
    var [rows] = [];
    if (byid) {
        [rows] = await conn.query("SELECT * FROM URLS WHERE id=?;", [byid]);
    } else if (bydate !== null) {
        [rows] = await conn.query("SELECT * FROM URLS WHERE create_time LIKE ?;", [`${bydate}%`]);
    } else if (byshortener !== null) {
        [rows] = await conn.query("SELECT * FROM URLS WHERE shortened_url=?;", [byshortener]);
    } else {
        [rows] = await conn.query("SELECT * FROM URLS;");
    }
    return rows;
}

async function insertURL(url) {
    const date = DateTime.now().toJSON();
    const conn = await connect();
    const sql = "INSERT INTO URLS(url_address,shortened_url,create_time) VALUES (?,?,?);";
    const values = [url.address, url.short, date];
    return await conn.query(sql, values);
}

async function updateURL(id, url) {
    const date = DateTime.now().toJSON();
    const conn = await connect();
    const sql = "UPDATE URLS SET url_address=?, shortened_url=?, update_time=?  WHERE id=?;";
    const values = [url.address, url.short, date, id];
    return await conn.query(sql, values);
}

async function deleteURL(id) {
    const conn = await connect();
    const sql = "DELETE FROM URLS WHERE id=?;";
    return await conn.query(sql, [id]);
}
module.exports = {selectURLs, insertURL, updateURL, deleteURL}