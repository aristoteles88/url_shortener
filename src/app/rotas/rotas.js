const functions = require("../../utils/functions");

module.exports = (router) => {
    const db = require("../../config/dbHelper");
    router.get('/', (req, resp) => resp.json({ message: 'Encurtador de urls - acesse https://calm-garden-14010.herokuapp.com/docs para a documentação ou https://calm-garden-14010.herokuapp.com/urls para ver endereços já cadastrados.'}));

    //READ ALL
    router.get('/urls', async function (req, resp) {
        const urls = await db.selectURLs();
        resp.json(urls);
    });

    //READ BY ID
    router.get('/urls/byid/:id', async function (req, resp) {
        const id = Number(req.params.id);
        const url = await db.selectURLs(id);
        resp.json(url);
    });

    //READ BY DATE (Format yyyy-mm-dd)
    router.get('/urls/bydate/:date', async function (req, resp) {
        const date = req.params.date;
        const urls = await db.selectURLs(null,date);
        resp.json(urls);
    });

    //READ BY SHORTENER
    router.get('/:shortener', async function (req, resp) {
        const shortener = req.params.shortener;
        if (shortener === "urls"){
            const urls = await db.selectURLs();
            resp.json(urls)
        } else {
            const url = await db.selectURLs(null,null,shortener)
            const redirectUrl = url[0]['url_address']
            resp.redirect(redirectUrl)
        }
    });

    //CREATE
    router.post('/urls', async function (req, resp) {
        const url_address = req.body.url_address.substring(0,255);
        var shortened_url = functions.randomAddress(functions.randomIntBetweenTwoInts(8,16));
        var shortener_ok = false;
        var count = 0;
        while (!shortener_ok && count < 10) {
            count += 1;
            const url = await db.selectURLs(null,null, shortened_url);
            if (url.length === 0)
                shortener_ok = true;
            else
                shortened_url = functions.randomAddress(functions.randomIntBetweenTwoInts(8,16));
        }
        if (shortener_ok) {
            url = {
                address: url_address,
                short: shortened_url
            }
            await db.insertURL(url_address, shortened_url);
        } else {
            url = {"message": "Não foi possível gerar um encurtador único para a URL. Tente novamente mais tarde."}
        }
        resp.json(url);
    });

    // //Os códigos de UPDATE e DELETE foram implementados apenas para estudo.
    // //Foram comentados por não fazerem parte do escopo do projeto.
    // //Para o UPDATE, foi criado o campo update_time no BD.
    // //UPDATE
    // router.put('/urls/:id', async function (req, resp) {
    //     const id = Number(req.params.id);
    //     const url_address = req.body.url_address.substring(0,255)
    //     const shortened_url = randomAddress(randomIntBetweenTwoInts(8,16));
    //     const url = {
    //         address: url_address,
    //         short: shortened_url
    //     }
    //     await db.updateURL(id, url_address, shortened_url);
    //     resp.json(url);
    // });

    // //DELETE
    // router.delete('/urls/:id', async function (req, resp) {
    //     const id = Number(req.params.id);
    //     const urls = await db.deleteURL(id);
    //     resp.json(urls);
    // });
}