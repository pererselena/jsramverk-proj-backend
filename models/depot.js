var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        ammount: { type: Number, required: true }
        }]
});

module.exports = mongoose.model('Depot', schema);