const mongoose = require('mongoose')

/* Create the Schema For Category */
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

/* Virtual Relation Between Category and Products For Mongoose to Understand */
categorySchema.virtual('products', {
    ref: 'Products',
    localField: '_id',
    foreignField: 'category'
})

/* Create the Category Model */
const Category = mongoose.model('Category', categorySchema)

module.exports = Category