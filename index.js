const db = require("./dbHelper");

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, resp) => resp.json({ message: 'Funcionando!'}));
app.use('/', router);

//READ ALL
router.get('/urls', async function (req, resp) {
    const urls = await db.selectURLs();
    resp.json(urls);
});
app.use('/urls', router);

//READ BY ID
router.get('/urls/byid/:id', async function (req, resp) {
    const id = Number(req.params.id);
    const urls = await db.selectURLs(id);
    resp.json(url);
});
app.use('/urls/byid/:id', router);

//READ BY DATE (Format yyyy-mm-dd)
router.get('/urls/bydate/:date', async function (req, resp) {
    const date = req.params.date;
    const urls = await db.selectURLs(null,date);
    resp.json(urls);
});
app.use('/urls/bydate/:date', router);

//READ BY SHORTENER
router.get('/:shortener', async function (req, resp) {
    const shortener = req.params.shortener;
    const url = await db.selectURLs(null,null,shortener);
    resp.json(url);
});
app.use('/:shortener', router);

//CREATE
router.post('/urls', async function (req, resp) {
    const url_address = req.body.url_address.substring(0,255);
    const shortened_url = randomAddress(randomIntBetweenTwoInts(8,16));
    const url = {
        address: url_address,
        short: shortened_url
    }
    await db.insertURL(url);
    resp.json(url);
});
app.use('/urls', router);

//UPDATE
router.put('/urls/:id', async function (req, resp) {
    const id = Number(req.params.id);
    const url_address = req.body.url_address.substring(0,255)
    const shortened_url = randomAddress(randomIntBetweenTwoInts(8,16));
    const url = {
        address: url_address,
        short: shortened_url
    }
    await db.updateURL(id, url);
    resp.json(url);
});
app.use('/urls/:id', router);

//DELETE
router.delete('/urls/:id', async function (req, resp) {
    const id = Number(req.params.id);
    const urls = await db.deleteURL(id);
    resp.json(urls);
});
app.use('/urls/:id', router);

app.listen(port);

//https://attacomsian.com/blog/javascript-generate-random-string
function randomAddress(length) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};

// Função que retorna um número inteiro aleatório entre dois inteiros positivos fornecidos.
// Caso seja fornecido um número negativo, este será considerado 1.
// Caso sejam passados dois números iguais, será retornado um número inteiro entre 1 e o número passado.
function randomIntBetweenTwoInts(intA, intB) {
    if (intA < intB)
        return intA + Math.floor(Math.random() * 1000) % (intB - intA);
    else if (intA > intB)
        return intB + Math.floor(Math.random() * 1000) % (intA - intB);
    else
        return Math.floor(Math.random() * 1000) % intA;
}

console.log("API funcionando!");