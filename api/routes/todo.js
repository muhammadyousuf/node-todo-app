const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Todos = require('../models/todo');

// router.get('/', (req, res, next) => {
//     Product.find().sort({ name: 1 })
//         .select("name price _id")
//         .exec()
//         .then(docs => {
//             console.log("Get all Documents ", docs);

//             if (docs.length >= 0) {
//                 const response = {
//                     count: docs.length,
//                     product: docs.map(doc => {
//                         return {
//                             name: doc.name,
//                             price: doc.price,
//                             _id: doc._id,
//                             request: {
//                                 type: 'GET',
//                                 url: 'http://localhost:5000/product/' + doc._id
//                             }
//                         }
//                     })
//                 }
//                 res.status(200).json(response);
//             } else {
//                 res.status(404).json({
//                     message: 'no entries found'
//                 });
//             }

//         })
//         .catch(err => {
//             console.log('error ', err);
//             res.status(500).json({
//                 error: err
//             });
//         })
// })
router.post('/', (req, res, next) => {

    const todo = new Todos({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        completed: req.body.completed
    })
    todo.save()
        .then(result => {
            console.log('result', result);
            res.status(200).json({
                message: 'Product Created SuccessFully',
                todos: {
                    title: result.title,
                    completed: result.completed,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/product/' + result._id
                    }
                }
            })
        }).catch(err => {
            console.log("error", err);
            res.status(500).json({ error: err })

        })

})
// router.get('/:productId', (req, res, next) => {
//     const id = req.params.productId;
//     Product.findById(id).select("name price _id").exec().then(doc => {
//         console.log("Form Database", doc);
//         if (doc) {
//             res.status(200).json({
//                 product: doc,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:5000/product'
//                 }
//             });
//         } else {
//             res.status(404).json({ message: 'No Valid Entry For Provided ID ' });
//         }

//     }).catch(err => {
//         console.log('error', err);
//         res.status(500).json({ error: err })
//     })

// })

// router.patch('/:productId', (req, res, next) => {
//     const id = req.params.productId;
//     const updateOpt = {};
//     for (const opt of req.body) {
//         updateOpt[opt.Propname] = opt.value;
//     }
//     Product.update({ _id: id }, { $set: updateOpt }).exec().then(result => {
//         console.log('update', result);
//         res.status(200).json({
//             message: 'Update Record Successfully',
//             request: {
//                 type: 'GET',
//                 url: 'http://localhost:5000/product/' + id
//             }
//         });
//     }).catch(err => {
//         console.log('error', err);
//         res.status(500).json({ error: err })
//     })
// })

// router.delete('/:productId', (req, res, next) => {
//     const id = req.params.productId;
//     Product.remove({ _id: id }).exec().then(result => {
//         res.status(200).json({
//             message: 'Deleted Product SuccessFully',
//             request: {
//                 type: 'POST',
//                 url: 'http://localhost:5000/product',
//                 body: { name: 'String', price: 'Number' }
//             }
//         })
//     }).catch(err => {
//         console.log('error', err);
//         res.status(500).json({ error: err })
//     })
// })

module.exports = router;