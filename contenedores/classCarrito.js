const fs = require('fs')

class Carrito {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo
    this.array = []
    this.timestamp = `${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}`
  }
  async getCById(num) {
    let readFile = await fs.readFileSync(`${this.nombreArchivo}`, "utf-8")
    this.array = JSON.parse(readFile)
    const i = this.array.find((item) => item.id === num)
    console.log(this.timestamp)
    if (i) return i
    return { Error: 'El carrito no existe' }
  }
  async saveC(carrito) {
    try {
      let readFile = await fs.readFileSync(`${this.nombreArchivo}`, "utf-8")
      this.array = JSON.parse(readFile)
      let newid = this.array.length + 1
      carrito.id = newid
      carrito.timestamp = this.timestamp
      this.array.push(carrito)
      fs.writeFileSync(
        `${this.nombreArchivo}`,
        JSON.stringify(this.array, null, 2)
      )
      return { 'Se agrego el carrito id': newid }
    }
    catch (err) {
      console.error("ERROR AL ESCRIBIR EL ARCHIVO", err)
    }
  }

  async addPalC(num, objeto) {
    try {
      let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8")
      this.array = JSON.parse(readFile)
      console.log(this.array)
      //para encontrar el carrito
      const carrito = this.array.find((item) => item.id === num)
      const carritoIndex = this.array.findIndex((item) => item.id === num)
      console.log(carrito.productos)
      // nuevo id y timestamp
      let newid = carrito.productos.length + 1
      objeto.id = newid
      objeto.timestamp = this.timestamp
      carrito.productos.push(objeto)
      this.array[carritoIndex] = carrito
      fs.writeFileSync(
        `${this.nombreArchivo}`,
        JSON.stringify(this.array, null, 2)
      )
    }
    catch (err) {
      console.error("ERROR AL ESCRIBIR EL ARCHIVO", err)
    }
  }

  deleteCById(id) {
    let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8")
    this.array = JSON.parse(readFile)
    const index = this.array.findIndex(item => item.id === id)
    const carr = this.array.find(item => item.id === id)
    if (carr) {
      this.array.splice(index, 1)
      fs.writeFileSync(
        `${this.nombreArchivo}`,
        JSON.stringify(this.array, null, 2)
      )
      return ({ 'Se elimino el carrito con el siguiente id': id })
    }
    else {
      return ({ 'El carrito con el siguiente ID no existe': id })
    }
  }

  deletePById(id, id_prod) {

    let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8")
    this.array = JSON.parse(readFile)
    const carr = this.array.find(item => item.id === id)
    const indexcarr = this.array.findIndex(item => item.id === id)
    const prodIndex = carr.productos.findIndex(item => item.id === id_prod)
    const prod = carr.productos.find(item => item.id === id_prod)
    if (prod) {
      carr.productos.splice(prodIndex, 1)
      this.array[indexcarr] = carr
      fs.writeFileSync(
        `${this.nombreArchivo}`,
        JSON.stringify(this.array, null, 2)
      )
      return ({
        'Se elimino del carrito': id,
        'el producto con el siguiente id': id_prod
      })
    }
    else {
      return ({
        'En el carrito': id,
        'El producto con el siguiente id no existe': id_prod
      })
    }
  }
}



module.exports = Carrito