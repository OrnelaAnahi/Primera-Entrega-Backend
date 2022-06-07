import express from 'express'
const { Router } = express


//------------------------------------------------------------------------
// instancio servidor

const app = express()

//--------------------------------------------
// permisos de administrador

const esAdmin = true



//--------------------------------------------
// configuro router de productos

import ProductosDaoArchivo from './daos/productos/ProductosDaoArchivo.js'
import CarritosDaoArchivo from './daos/carritos/CarritosDaoArchivo.js'
const productosApi = new ProductosDaoArchivo()
const carritosApi = new CarritosDaoArchivo()

// import ProductosDaoMongoDb from './daos/productos/ProductosDaoMongoDb.js'
// import CarritosDaoMongoDb from './daos/carritos/CarritosDaoMongoDb.js'
// const productosApi = new ProductosDaoMongoDb()
// const carritosApi = new CarritosDaoMongoDb()

// import ProductosDaoFirebase from './daos/productos/ProductosDaoFirebase.js'
// import CarritosDaoFirebase from './daos/carritos/CarritosDaoFirebase.js'
// const productosApi = new ProductosDaoFirebase()
// const carritosApi = new CarritosDaoFirebase()



const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productos = await productosApi.getAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await productosApi.getById(req.params.id))
})

productosRouter.post('/', async (req, res) => {
    let save = await productosApi.save(req.body)
    res.json(save)
})

productosRouter.put('/:id', async (req, res) => {
    res.json(await productosApi.putUpload(req.body))
})

productosRouter.delete('/:id', async (req, res) => {
    res.json(await productosApi.deleteById(req.params.id))
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    res.json((await carritosApi.getAll()).map(c => c.id))
})

carritosRouter.post('/', async (req, res) => {
    res.json(await carritosApi.save())
})

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await carritosApi.deleteById(req.params.id))
})

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.getAll(req.params.id)
    res.json(carrito.productos)
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.getById(req.params.id)
    const producto = await productosApi.getById(req.body.id)
    carrito.productos.push(producto)
    await carritosApi.putUpload(carrito)
    res.end()
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carrito = await carritosApi.getAll(req.params.id)
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await carritosApi.putUpload(carrito)
    }
    res.end()
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

export default app