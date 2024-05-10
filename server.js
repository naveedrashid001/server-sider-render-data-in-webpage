const express = require("express");
const path = require("path");
const PORT = 5000;
const app = express();

app.set('view engine', 'ejs');    // Set the view engine to EJS
app.set('views', path.join(__dirname, "views"));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());  /// for json formate
let product = [];



///// rander home page in server side
app.get("/homepage", (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "views/index.html"));
});


//// add name and price .
app.post("/addproduct", (req, res) => {
    const { name, price } = req.body;
    product.push({ name, price })
    res.status(200).send(product);
})

////// get all products
app.route("/allproducts").get((req, res, next) => {
    res.status(201).send(product);
})


///// using ejs reder data 
app.route("/showproducts").get(function(req, res) {
    res.status(200).render('products', { product });
});


//// GET single product 
app.route("/product/:productindex").get((req, res, next) => {
    let { productindex } = req.params;
    if (!product[productindex]) {
        res.status(409).send("product id not valid");
    }
    res.status(201).send(product);
})
//// update (put methord)
app.route("/product/:productindex").put((req, res, next) => {
    let { productindex } = req.params;
    if (!product[productindex]) {
        res.status(409).send("product id not valid");
    }
    const { name, price } = req.body;
    if (!name && !price) {
        res.status(404).send("required field can not be empty");
    }
    product[productindex].name = name;
    product[productindex].price = price;
    res.status(201).send(product[productindex]);
})
//////  delete product 
app.route("/:productindex").delete((req, res, next) => {
    const { productindex } = req.params;
    if (!product[productindex]) {
        res.status(409).send("product id not valid");
    }
    product.splice(productindex, 1);
    res.status(201).send("product delete sussfully !!!");
})



app.listen(PORT, () => console.log(`server are sucessfully run on port no:${PORT}`));