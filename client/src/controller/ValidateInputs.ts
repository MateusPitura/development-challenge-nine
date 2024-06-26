import { toastError } from "./ToastController.ts"
import moment from "moment"

export const validateName = (name: string) => {
    const regex = /^[a-zA-Z]+(?:['\- ][a-zA-Z]+)*$/
    if (regex.test(name)) {
        return true
    }
    toastError("Invalid name")
    return false
}

export const validateBirthdate = (birthdate: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(birthdate)) {
        toastError("Invalid date")
        return false
    }
    if(moment(birthdate).isAfter(moment())){
        toastError("Invalid birthdate")
        return false
    }
    return true
}

export const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regex.test(email)) {
        return true
    }
    toastError("Invalid email")
    return false
}

export const validatePostalCode = (postalCode: string) => {
    const regex = /^[0-9]{8}$/
    if (regex.test(postalCode)) {
        return true
    }
    return false
}

export const validateNumber = (number: string) => {
    if (number) {
        return true
    }
    toastError("Invalid number")
    return false
}