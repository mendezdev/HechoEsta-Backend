const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');
const saleService = require('../services/saleService');

router.get('/', (req, res, next) =>{
    saleService.getSales((err, sales) =>{
        if(err){
            res.json({
                success: false,
                err: err
            });
        } else {
            res.json({
                success: true,
                sales: sales
            });
        }
    });
});

router.get('/:id', (req, res, next) => {
    saleService.getSaleById(req.params.id, (err, sale) => {
        if(err){
            return res.json({
                success: false,
                err: err
            });
        } else {
            res.json({
                success: true,
                data: sale
            });
        }
    })
});

router.post('/', (req, res, next) =>{
    let newSale = new Sale({
        client: req.body.client,
        items: req.body.items,
        total: req.body.total,
        userTransaction: req.body.userTransaction
    });

    saleService.addSale(newSale, (err, sale) =>{
        if(err){
            res.json({
                success: false,
                msg: "Failed making sale",
                err: err
            });
        } else {
            res.json({
                success: true,
                msg: "Transaction success",
                data: sale
            });
        }
    });
});

module.exports = router;