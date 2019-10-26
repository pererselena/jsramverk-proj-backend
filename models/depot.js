var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        amount: { type: Number },
        boughtPrice: { type: Number }
        }]
});

module.exports = mongoose.model('Depot', schema);