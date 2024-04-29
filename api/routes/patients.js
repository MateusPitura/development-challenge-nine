import express from "express"
import { getPatients, addPatient, updatePatient, deletePatient } from "../controllers/patients.js"

const router = express.Router()

router.get("/", getPatients)

router.post("/", addPatient)

router.put("/:id", updatePatient)

router.delete("/:id", deletePatient)

export default router