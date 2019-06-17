const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Todos = require('../models/todo');

router.get('/todos', (req, res, next) => {
    Todos.find().sort({ title: 1 })
        .select("title completed _id")
        .exec()
        .then(docs => {
            if (docs.length >= 0) {
                const response = {
                    count: docs.length,
                    todos: docs.map(doc => {
                        return {
                            title: doc.title,
                            completed: doc.completed,
                            _id: doc._id
                        }
                    })
                }
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'no entries found'
                });
            }

        })
        .catch(err => {
            console.log('error ', err);
            res.status(500).json({
                error: err
            });
        })
})
router.post('/add', (req, res, next) => {

    const todo = new Todos({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        completed: req.body.completed
    })
    todo.save()
        .then(result => {
            res.status(201).json({
                message: 'Todo Created SuccessFully',
                todos: {
                    title: result.title,
                    completed: result.completed,
                    _id: result._id
                }
            })
        }).catch(err => {
            res.status(500).json({ error: err })

        })

})
router.get('/todos/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    Todos.findById(id).select("title completed _id").exec().then(doc => {
        if (doc) {
            res.status(200).json({
                todos: doc
            });
        } else {
            res.status(404).json({ message: 'No Valid Entry For Provided ID ' });
        }

    }).catch(err => {
        console.log('error', err);
        res.status(500).json({ error: err })
    })

})

router.patch('/todos/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    Todos.findById(id).select("title completed _id").exec().then(doc => {
        if (doc.completed === false) {
            Todos.updateOne({ _id: id }, { $set: { completed: true } }).exec().then(result => {

                res.status(200).json({
                    message: 'Update Record Successfully',
                    todo: {
                        _id: doc._id,
                        title: doc.title,
                        completed: true
                    }
                });
            })
        }
        else {
            res.status(409).json({
                message: "Already Updated todo"
            })
        }
    }).catch(err => {
        console.log('error', err);
        res.status(500).json({ error: err })
    })
})

router.delete('/todos/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    Todos.remove({ _id: id }).exec().then(result => {
        res.status(203).json({
            message: 'Deleted Todo SuccessFully'
        })
    }).catch(err => {
        console.log('error', err);
        res.status(500).json({ error: err })
    })
})

module.exports = router;