const express = require("express")
const dotenv = require("dotenv")
const app = express()
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT
dotenv.config()

app.use(express.json())





app.get("/api", (req, res) => {
    res.send("Helloa Worldddd")
})

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.send(products)
})

app.post("/products", async (req, res) => {
    const newProductData = req.body
    console.log(newProductData)
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image,
        }
    })



    res.status(201).send("create product success")
})

app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id

    await prisma.product.delete({
        where: {
            id: parseInt(productId),
        }
    })
    res.send("product success deleted")
})

app.put("/products/:id", async (req, res) => {
    const productId = req.params.id
    const productData = req.body;


    const product = await prisma.product.update({
        where: {
            id: parseInt(productId)
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    })
    res.send({
        data: product,
        message: "succes update"
    })
})

app.patch("/products/:id", async (req, res) => {
    const productId = req.params.id
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId)
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    })
    res.send({
        data: product,
        message: "succes update"
    })
})


app.listen(PORT, () => {
    console.log("express api running: " + PORT)
})

app.use(express.static("src/"))