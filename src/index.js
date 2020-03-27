/* Imports of the required modules */
const express = require('express')
require('./database/mongoose')
const Product = require('./models/product')
const Category = require('./models/category')

/* Code to create the object of express */
const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

/* End Point to create a Category in the Category Collection */
app.post('/category', async (req, res) => {
    const newCategory = new Category(req.body)
    try {
       await newCategory.save()
       res.status(201).send({ category: newCategory })
    }
    catch(e) {
        res.status(400).send(e)
    }    
})

/* End Point to Create Products Corresponding to Each Category */
app.post('/category/product', async (req, res) => {
    if(!req.body.category){
        res.status(400).send({ error: 'Invalid Category' })
    }
     const product = new Product({
         ...req.body
     })
     try {
       await product.save()
       res.status(201).send({ product })
     }
     catch(e) {
       res.status(400).send(e)
     }    
})

/* End Point to Fetch the Categories along with corresponding Product Count */
app.get('/categories', async (req, res) => {
    var categoryList = new Array()
    const categories = await Category.find()
    for ( const category of categories ){
        var count =  await Product.find({ category: category._id }).countDocuments()
        categoryList.push({"category": category.name, "Product Count": count})
    } 
    try{
       res.status(200).send(categoryList)
    }
    catch(e) {
       res.status(500).send({ error: 'No data to display'})
    }
})

/* Code to start the server at port 3000 */
app.listen(port, () => {
    console.log('Server Is Up and Running', port)
})