export const validatePhoneNumber = (input) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    return phoneRegex.test(input)
}

export const getDigitsFromPhoneNumber = (input) => {
    return input.replace(/\D/g, "")
}

export const validateEmail = (text) =>{
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return emailRegex.test(text)
}

export const validateZipCode = (text) => {
    const zipRegex = /^\d{5}$/
    return zipRegex.test(text)
}