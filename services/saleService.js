const Sale = require('../models/sale');

module.exports.addSale = function(sale, callback){
    sale.save(callback);
}

module.exports.getSales = function(callback){
    Sale.find(callback);
}

module.exports.getSaleById = function(id, callback){
    Sale.findById(id, callback);
}

module.exports.removeSaleById = function(id, callback){
    Sale.findByIdAndRemove(id, callback);
}