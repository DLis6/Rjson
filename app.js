const express = require('express');
const app = express();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
})

var Products = mongoose.model("Productos", schema);


app.get('/products', async(req, res) => { //Muestra constendo json de los libros.

    await Products.create({ name: "Miserables", price: 40000 }, function(err) {
        if (err) return console.error(err);
    });

    var info = await Products.find({}).exec();
    res.json(info);
});

app.listen(3000, () => console.log('Listening on port 3000!'));