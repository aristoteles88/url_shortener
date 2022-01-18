const app = require("./src/config/custom-express")

const port = 3000

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