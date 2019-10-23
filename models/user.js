var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, required: true },
    depot: { type: Schema.Types.ObjectId, ref: 'Depot' }
});

module.exports = mongoose.model('User', schema);