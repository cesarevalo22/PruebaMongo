const express = require("express")
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const  ProductsDao = require("./infraestructure/dao/productsDao/productsDao")


//invoke routes

const productRoutes = require("./routes/productRoutes")


//
if (process.env.NODE_ENV !== "production"){
    dotenv.config();
}

const app = express()

//db

 MongoClient.connect(
    process.env.DB_URI, //databaseUri
    {writeConcern: {wtimeout: 2500}, poolSize: 50, useNewUrlParser: true,  useUnifiedTopology: true  } //writeConcern, poolMaximo
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ProductsDao.injectdb(client)
}) 
//

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });


  app.get("/", (request, response) => {
    response.json({ info: "Stam Suite Administration Module service is running..." });
  });


  //Routes app.use 

  app.use(productRoutes)



  app.use(function (req, res, next) {
    res.status(404).send("Sorry, can't find that!");
  });

  var server = app.listen( process.env.PORT || 8080, () =>{
      console.log(`the server starts at http://localhost:${process.env.PORT}`);
  })
