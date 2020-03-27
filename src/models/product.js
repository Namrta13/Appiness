const mongoose = require('mongoose')

/* Create The Schema For Product Model */
const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
})

/* Create the Product Model */
const Products = mongoose.model('Products', productSchema)

module.exports = Products