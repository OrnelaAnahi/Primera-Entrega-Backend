import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('carritos.json')
    }

    async guardar(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

export default CarritosDaoArchivo