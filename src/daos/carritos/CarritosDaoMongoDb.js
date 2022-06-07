import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

  constructor() {
    super('carritos', {
      productos: { type: [], required: true }
    })
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito)
  }
}

export default CarritosDaoMongoDb