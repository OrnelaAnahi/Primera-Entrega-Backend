import { fs } from 'file-system'
import config from '../config.js'

class ContenedorArchivo {

  constructor(ruta) {
    this.RutaArchivo = `.${config.fileSystem.path}/${ruta}`;
    this.Archiv = new Array()
  }

  async save(objeto) {
    let idAdded = this.Archiv.length;
        /*para evitar que se ingrese un id diferente ====>>>*/ delete objeto.id;
    Object.assign(objeto, { id: idAdded + 1 });
    Object.assign(objeto, { thumbnail: `imagen${idAdded + 1}.png` })
    Object.assign(objeto, { title: `producto numero ${idAdded + 1}` });
    try {
      this.Archiv.push(JSON.stringify(objeto));
      fs.writeFileSync(this.RutaArchivo, JSON.stringify(this.Archiv));
      console.log(
        `has agregado : ${JSON.stringify(objeto)}\n su id: ${objeto.id}`
      );
    } catch (err) {
      console.error("error en metodo save()", err);
    }
  }
  async getById(num) {
    if (num <= this.Archiv.length || num == !null || num == !undefined) {
      return JSON.parse(fs.readFileSync(`${this.RutaArchivo}`, "utf-8")).map((element) => JSON.parse(element)).filter((el) => el.id === num);
    } else {
      return `${null} {no existe ningun producto con este id}`;
    }
  }
  async getAll() {
    return this.Archiv.map((e) => JSON.parse(e));
  }
  async deleteById(numId) {
    let finfElemenDelet = JSON.parse(fs.readFileSync(`${this.RutaArchivo}`, "utf-8")).map((element) => JSON.parse(element));
    let fil = JSON.stringify(finfElemenDelet.filter((el) => el.id !== numId));
    fs.writeFileSync(this.RutaArchivo, JSON.stringify(fil));
    return `se ah borrado producto con id ${numId}`
  }
  async deleteAll() {
    fs.writeFileSync(`${this.RutaArchivo}`, JSON.stringify([]));
  }
  async getIdAleat() {
    let arch = JSON.parse(fs.readFileSync(`${this.RutaArchivo}`, "utf-8")).map((itm) => JSON.parse(itm))
    return Math.floor(Math.random() * (arch.length - 1)) + 1
  }
  async putUpload(id, newprod) {
    const index = this.Archiv.findIndex(item => item.id === id)
    newprod.id = id
    this.productos[index] = newprod
    return ({ 'Se actualizo el siguiente producto': newprod })
  }
}


export default ContenedorArchivo