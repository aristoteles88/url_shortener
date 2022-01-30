var { DateTime } = require('luxon');
/**
 * @module dbHelper
 */

/**
 * Cria a conexão com o banco de dados MySQL utilizando os parâmetros definidos no arquivo .env.
 * @returns {} Dados da conexão com o banco de dados MySQL.
 */


async function dbClient() {
    require("dotenv").config('../../');

    const { Client } = require('pg')

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
      });

    await client.connect();

    return client;
};

/**
 * Faz a consulta das urls no banco de dados. pode receber um dos três parâmetros: byid, bydate e byshortener, ou nenhum parâmetro.
 * Caso não sejam passados parâmetros, serão retornadas todas as urls presentes no banco de dados.
 * Caso seja passado o parâmetro byid, será retornada apenas a url cujo valor id é igual ao valor byid ou retornará nada.
 * Caso seja passado o parâmetro bydate, serão retornadas todas as urls cuja data de criação (create_time) é igual ao valor bydate ou retornará nada.
 * Caso seja passado o parâmetro byishortener, será retornada apenas a url cujo valor shortened_url é igual ao valor byshortener ou retornará nada.
 * @param {int} byid - Inteiro que representa o id do registro no banco de dados.
 * @param {string} bydate - String representando uma data no formado yyyy-mm-dd.
 * @param {string} byshortener - String com tamanho entre 8e 16 caracteres contendo eletras maiúsculas, letras minúsculas e números.
 * @returns {Promise<any>} JSON contendo informações sobre a operação no banco de dados
 */
async function selectURLs(byid, bydate, byshortener) {
    const pgClient = await dbClient();
    var rows = [];
    if (byid) {
        rows = await pgClient.query("SELECT * FROM urls WHERE id=$1;", [byid])
    } else if (bydate) {
        rows = await pgClient.query("SELECT * FROM urls WHERE create_time::text LIKE $1;", [`${bydate}%`])
    } else if (byshortener) {
        rows = await pgClient.query("SELECT * FROM urls WHERE shortened_url=$1;", [byshortener])
    } else {
        rows = await pgClient.query('SELECT * FROM urls;')
    }
    return rows.rows
};

/**
 * Cria registro da url informada no parâmetro no banco de dados.
 * @param {string} url - String representando a url que deve ser encurtada.
 * @param {string} short - String representando a url já encurtada.
 * @returns {Promise<any>} JSON contendo informações sobre a operação no banco de dados
 */
async function insertURL(url,short) {
    if (url !== "" && short !== ""){
        const date = DateTime.now().toJSON();
        const pgClient = await dbClient();
        
        const sql = "INSERT INTO urls(url_address, shortened_url, create_time) VALUES($1,$2,$3)";
        const values = [url, short, date];
        const resp = await pgClient.query(sql, values)
        return resp;
    } else {
        return {"message": "Os valores url e short não podem ser vazios."}
    }
};

// /**
//  * Atualiza um regstro no banco de dados a partir do seu id.
//  * @param {int} id - Inteiro que representa o id do registro no banco de dados.
//  * @param {string} url - String representando a url que deve ser encurtada.
//  * @param {string} short - String representando a url já encurtada.
//  * @returns {Promise<any>} JSON contendo informações sobre a operação no banco de dados
//  */
// async function updateURL(id, url, short) {
//     const date = DateTime.now().toJSON();
//     const conn = await connect();
//     const sql = "UPDATE URLS SET url_address=?, shortened_url=?, update_time=?  WHERE id=?;";
//     const values = [url.address, url.short, date, id];
//     return await conn.query(sql, values);
// }

// /**
//  * Remove um registro do banco de dados a partir do seu id.
//  * @param {int} id - Inteiro que representa o id do registro no banco de dados.
//  * @returns JSON contendo informações sobre a operação no banco de dados
//  */
// async function deleteURL(id) {
//     const conn = await connect();
//     const sql = "DELETE FROM URLS WHERE id=?;";
//     return await conn.query(sql, [id]);
// }
// module.exports = {selectURLs, insertURL, updateURL, deleteURL};
module.exports = {selectURLs, insertURL};