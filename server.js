const express = require("express");
const path = require("path");
const product=require("./module/index");
const ProductRouter=require("./routes/productRoutes");
const PORT = 5000;
const app = express();

app.set('view engine', 'ejs');    // Set the view engine to EJS
app.set('views', path.join(__dirname, "views"));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());  /// for json formate

///// rander home page in server side
app.get("/homepage", (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "views/index.html"));
});
///// using ejs reder data 
app.route("/showproducts").get(function(req, res) {
    res.status(200).render('products', { product });
});

/// product Route
app.use("/api",ProductRouter)

app.listen(PORT, () => console.log(`server are sucessfully run on port no:${PORT}`));