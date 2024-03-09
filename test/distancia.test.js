const { compararTextos } = require('../src/natural'); // Reemplaza 'tuArchivo.js' con el nombre de tu archivo que contiene la función compararTextos

describe('compararTextos', () => {
    test('debería devolver true para textos idénticos', () => {
        const texto1 = "Sony WH-CH520 Wireless Headphones";
        const texto2 = "Sony WH-CH520 Noise Canceling Wireless Headphones";
        const resultado = compararTextos(texto1, texto2);
        expect(resultado).toBeTruthy();
    });

    test('debería devolver false para textos diferentes', () => {
        const texto1 = "Sony MDREX15LP";
        const texto2 = "Sony MDRXB50AP";
        const resultado = compararTextos(texto1, texto2);
        expect(resultado).toBeFalsy();
    });

});