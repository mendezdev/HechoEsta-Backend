const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
    client:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },    
    items:[
        {
            description: {
                type: String,
                required: true
            },
            qty:{
                type: Number,
                required: true
            },
            unitPrice:{
                type: Number,
                required: true
            },
            subTotal:{
                type: Number,
                required: true
            }
        }
    ],
    total:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    userTransaction:{
        type: String,
        required: true
    },
    updateDate:{
        type: Date,
        default: null
    }
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;