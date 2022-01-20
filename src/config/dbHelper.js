var { DateTime } = require('luxon');


async function connect() {
    if (global.connection && global.connection.state !== "disconnected") {
        return global.connection;
    }

    require("dotenv").config('../../');
    const host = process.env.DB_HOST;
    const port = process.env.PORT;
    const user = process.env.DB_USER;
    const password = process.env.PASSWORD;
    const database = process.env.DATABASE;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host     : host,
        port     : port,
        user     : user,
        password : password,
        database : database
    });
    console.log("Conectou ao MySQL!");
    global.connection = connection;
    return connection;
}

async function selectURLs(byid, bydate, byshortener) {
    const conn = await connect();
    var [rows] = [];
    if (byid) {
        [rows] = await conn.query("SELECT * FROM URLS WHERE id=?;", [byid]);
    } else if (bydate) {
        [rows] = await conn.query("SELECT * FROM URLS WHERE create_time LIKE ?;", [`${bydate}%`]);
    } else if (byshortener) {
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