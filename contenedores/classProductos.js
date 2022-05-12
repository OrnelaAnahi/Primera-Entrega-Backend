const fs = require('fs');

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo
    this.array = []
    this.timestamp = `${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}`
  }

  getAll() {
    const readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8")
    return readFile
  }

  getById(num) {
    let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8")

    this.array = JSON.parse(readFile)

    const i = this.array.find((item) => item.id === num)

    console.log(JSON.stringify(i));

    const timestamp = this.timestamp

    if (i) return i;

    return { Error: 'El producto no existe' }

  }

  async save(objeto) {
    try {
      let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8")

      this.array = JSON.parse(readFile)

      let newid = this.array.length + 1


      objeto.id = newid
      objeto.timestamp = this.timestamp

      this.array.push(objeto)

      fs.writeFileSync(
        `${this.nombreArchivo}`,
        JSON.stringify(this.array, null, 2)
      )

    }
    catch (err) {
      console.error("ERROR AL ESCRIBIR EL ARCHIVO", err)
    }
  }

  deleteById(id) {

    let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8")

    this.array = JSON.parse(readFile)
    // ENCUENTRA EL PRODUCTO SI EXISTE
    const prod = this.array.find(item => item.id === id)

    const itemElim = this.array.filter((item) => item.id !== id)

    const resto = itemElim.map(e=>{
      if(e.id>id){
        e.id=e.id-1
      }
      return e
    })
    this.array = resto

    if (prod) {
      fs.writeFileSync(`${this.nombreArchivo}`, JSON.stringify(this.array, null, 2))
      return ({ 'Se elimino el producto con el siguiente id': id })
    }
    else {
      return ({ 'El producto con el siguiente ID no existe': id })
    }
  }

  putUpload(id, newprod) {

    let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8");

    this.array = JSON.parse(readFile);

    const index = this.array.findIndex(item => item.id === id)

    const oldprod = this.array.find(item => item.id === id)

    if (oldprod) {
      newprod.id = id
      newprod.timestamp = this.timestamp
      this.array[index] = newprod

      fs.writeFileSync(
        `${this.nombreArchivo}`,
        JSON.stringify(this.array, null, 2)
      );

      return ({ 'Se actualizo el siguiente producto': newprod })
    } else {

      return ({ 'No existe el producto con el siguiente ID': id })

    }
  }

}



module.exports = Contenedor;