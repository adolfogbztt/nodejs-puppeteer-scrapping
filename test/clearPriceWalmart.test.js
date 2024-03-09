const { clearPriceWalmart } = require('../src/utils/regex.js');

describe('clearPriceWalmart', () => {
    test('Debería devolver el valor numérico sin el signo de dólar', () => {
        const input = "$7999\ncurrent price $79.99";
        const output = clearPriceWalmart(input);
        expect(output).toBe(79.99);
    });

    test('Debería devolver 0 si no se encuentra un valor válido', () => {
        const input = "No hay ningún valor válido aquí";
        const output = clearPriceWalmart(input);
        expect(output).toBe(0);
    });
});