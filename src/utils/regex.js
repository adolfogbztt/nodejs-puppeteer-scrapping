/**
 * Limpia un precio de Walmart de una cadena, eliminando el signo de dólar y devolviendo el valor numérico.
 * @param {string} string - Cadena que contiene el precio de Walmart.
 * @returns {number} - Valor numérico del precio de Walmart, o 0 si no se encuentra un precio válido.
 */
function clearPriceWalmart(string) {
    // Busca el patrón $ seguido de números, un punto y dos números al final de la cadena.
    const regex = /\$\d+\.\d{2}$/;
    const matches = string.match(regex);

    if (matches) {
        const ultimoValor = matches[0];
        console.log(`output->ultimoValor`, ultimoValor)
        // Remueve el signo de dólar y convierte el valor en un número decimal.
        const ultimoValorSinDolar = parseFloat(ultimoValor.replace('$', ''));
        return ultimoValorSinDolar;
    } else {
        // Devuelve 0 si no se encuentra un precio válido.
        return 0;
    }
}

module.exports = { clearPriceWalmart } ;