const express = require("express")
const cors = require("cors")
const app = express()

const admin = require("firebase-admin")
const credentials = require("../../key.json")

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

app.use(express.json())

app.use(cors())

app.unsubscribe(express.urlencoded({ extended: true }))

const db = admin.firestore()

app.post("/", async (req, res) => {
    try {
        const patientJson = {
            name: req.body.name,
            birthdate: req.body.birthdate,
            email: req.body.email,
            postalCode: req.body.postalCode,
            street: req.body.street,
            number: req.body.number,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
        }
        const response = db.collection("patients").add(patientJson);
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

app.get("/", async (req, res) => {
    try {
        const patientsRef = db.collection("patients")
        const response = await patientsRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push({
                id: doc.id,
                ...doc.data()
            })
        })
        res.send(responseArr)
    } catch (error) {
        res.send(error)
    }
})

app.get("/:id", async (req, res) => {
    try {
        const patientRef = db.collection("patients").doc(req.params.id)
        const response = await patientRef.get();
        res.send(response.data())
    } catch (error) {
        res.send(error)
    }
})

app.put("/:id", async (req, res) => {
    try {
        const name = req.body.name
        const birthdate = req.body.birthdate
        const email = req.body.email
        const postalCode = req.body.postalCode
        const street = req.body.street
        const number = req.body.number
        const neighborhood = req.body.neighborhood
        const city = req.body.city
        const state = req.body.state

        const patientRef = await db.collection("patients").doc(req.params.id).update({
            name,
            birthdate,
            email,
            postalCode,
            street,
            number,
            neighborhood,
            city,
            state,
        })

        res.send(patientRef)
    } catch (error) {
        res.send(error)
    }
})

app.delete("/:id", async (req, res) => {
    try {
        const response = await db.collection("patients").doc(req.params.id).delete()
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

const PORT = 8800
app.listen(PORT, () => {
    console.log("Server is running on PORT 8800")
})