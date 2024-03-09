// import natural from 'natural';
const natural = require('natural');
// Definir una función para comparar textos
function compararTextos(texto1, texto2, umbral = 0.3) {
    // Convertir ambos textos a minúsculas para evitar diferencias de capitalización
    texto1 = texto1.toLowerCase();
    texto2 = texto2.toLowerCase();

    // Tokenizar los textos en palabras
    const tokenizer = new natural.WordTokenizer();
    const tokens1 = tokenizer.tokenize(texto1);
    const tokens2 = tokenizer.tokenize(texto2);

    // Calcular la distancia entre los textos utilizando la distancia de Jaccard
    const distanciaJaroWinkler = natural.JaroWinklerDistance(tokens1, tokens2, false)
    console.log(`output->distancia`, distanciaJaroWinkler)
    // Devolver true si la distancia de JaroWinkler supera el umbral especificado
    return distanciaJaroWinkler >= umbral ? true : false;
}

// // Ejemplo de uso
// const texto1 = "Sony MDREX15LP ";
// const texto2 = "Sony MDREX15LP";

// if (compararTextos(texto1, texto2)) {
//     console.log("Los textos se refieren al mismo producto.");
// } else {
//     console.log("Los textos no se refieren al mismo producto.");
// }

module.exports = { compararTextos }