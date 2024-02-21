const mongoose = require('mongoose');
const Users = require('../models/users');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const URL = process.env.URL || "http://localhost:3000"

const makePayment = async (req, res) => {
    const { priceId, plan } = req.body
    const email = req.email

    const customer = await stripe.customers.create({
        name: '',
        email: '',
    });

    const line_items = [{
        price: priceId,
        quantity: 1,
    }]

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        success_url: `${URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${URL}/subscription/cancel`,
        line_items,
        // customer: email, for existing stripe cutomer
        customer_email: email,
        metadata: {
            email,
            plan
        }
    })

    res.status(200).json({ id: session.id })
}


//changing user plan after payment success
const updatePlan = async (req, res) => {
    try {
        const { sessionId } = req.params
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === 'paid') {
            const updatedData = await Users.findOneAndUpdate({ email: session.customer_email }, { $set: { plan: session.metadata.plan } }, { new: true })
            return res.status(200).json(updatedData)
        } else {
            res.status(400).json({ error: "Not paid" })
        }
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

const cancelPlan = async (req, res) => {
    try {
        const _id = req.userId;
        const updatedData = await Users.findByIdAndUpdate(_id, { $set: { plan: 'free' } }, { new: true })
        return res.status(200).json(updatedData)
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }

}

module.exports = { makePayment, updatePlan, cancelPlan }