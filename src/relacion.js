const fs = require("fs");
const { compararTextos } = require("./natural");

(async () => {
    let amazonProductos = fs.readFileSync('./json/amazon.json', 'utf8');
    amazonProductos = JSON.parse(amazonProductos);
    amazonProductos = amazonProductos.map((v) => {
        return { ...v, web: 'amazon' }
    })

    let targetProductos = fs.readFileSync('./json/target.json', 'utf8');
    targetProductos = JSON.parse(targetProductos);
    targetProductos = targetProductos.map((v) => {
        return { ...v, web: 'target' }
    })

    // console.log(amazonProductos, targetProductos)

    let productos = await Promise.all(amazonProductos.map(async (amazonProducto) => {
        amazonProducto.rel = []
        for (const targetProducto of targetProductos) {
            let distancia = compararTextos(amazonProducto.nombre, targetProducto.nombre);
            if (distancia) {
                amazonProducto.rel.push(targetProducto);
                console.log(targetProducto.precio, '<', amazonProducto.precio)
                if (targetProducto.precio < amazonProducto.precio) {
                    amazonProducto.precio = targetProducto.precio;
                    amazonProducto.web = targetProducto.web;
                }
            }
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        return { ...amazonProducto }
    }));

    fs.writeFileSync('./json/relacion.json', JSON.stringify(productos))
    console.log(`output-productos`, productos)

})()