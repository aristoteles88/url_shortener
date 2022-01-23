    /**
     * @module functions
     */

    /**
     * Função que retorna uma string contendo letras maiúsculas, letras minúsculas e números de tamanho length.
     * Código obtido no endereço: https://attacomsian.com/blog/javascript-generate-random-string
     * @param {int} length - Tamanho (inteiro) da string desejada.
     * @returns {string} String de tamanho length composta por letras maiúsculas, letras minúsculas e números.
     */
    function randomAddress(length) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    };

    /**
     * Função que retorna um número inteiro aleatório entre dois inteiros positivos fornecidos.
     * Os parâmetros passados serão avaliados e retornará o valor independente de qual é o maior e qual é o menor inteiro.
     * Caso seja fornecido um número negativo ou o zero, este será considerado 1.
     * Caso sejam passados dois números iguais, será retornado um número inteiro entre 1 e o número passado.
     * @param {int} intA - Inteiro positivo. Caso seja passado um número negativo ou nulo, será considerado 1.
     * @param {int} intB - Inteiro positivo. Caso seja passado um número negativo ou nulo, será considerado 1.
     * @returns {int} Um inteiro positivo entre intA e intB.
     */
    function randomIntBetweenTwoInts(intA, intB) {
        if (intA < 1)
            intA = 1;
        if (intB < 1)
            intB = 1;
        if (intA < intB)
            return intA + Math.floor(Math.random() * 1000) % (intB - intA);
        else if (intA > intB)
            return intB + Math.floor(Math.random() * 1000) % (intA - intB);
        else
            return Math.floor(Math.random() * 1000) % intA;
    };

    module.exports = {randomAddress,randomIntBetweenTwoInts}