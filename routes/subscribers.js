const express = require('express')
const Router = express.Router()
const Subscriber = require('../models/Subscribers')

// MiddleWare to verify that Subscriber's ID is present database or not
const getSubscriber = async (req, res, next) => {
    let subscriber
    try {
        // console.log(req.params.id)
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber === null) {
            return res.status(404).json({ message: "Can't Find Subscriber" })
        }


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.subscriber = subscriber
    next()
}


// GET -> Getting all Subscribers
Router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET -> Getting one Subscriber
Router.get('/:id', getSubscriber, async (req, res) => {
    try {
        res.status(200).json(res.subscriber)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST -> Creating one Subscriber
Router.post('/', async (req, res) => {
    try {
        const body = await req.body
        const newSubscriber = await Subscriber.create({
            name: body.name,
            email: body.email,
            ChannelSubscribed: body.ChannelSubscribed
        });

        res.status(201).json(newSubscriber)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// PATCH -> Updating one Subscriber
Router.patch('/:id', getSubscriber, async (req, res) => {
    try {
        const body = await req.body
        await Subscriber.findByIdAndUpdate(req.params.id, {
            name: body.name,
            email: body.email,
            ChannelSubscribed: body.ChannelSubscribed
        })
        res.status(200).json({message: "Subscriber Updated"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE -> Deleting one Subscriber
Router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id)
        res.json({ message: "Deleted Subscriber" })
    }
     catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = Router;