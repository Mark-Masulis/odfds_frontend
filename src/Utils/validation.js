import * as Yup from 'yup';


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

export const restaurantOrderSchema = Yup.object().shape({
    name:Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Name is required'),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    address: Yup.string()
        .min(5, 'Address must be at least 5 characters')
        .max(100, 'Address must be less than 100 characters')
        .required('Address is required'),
    city: Yup.string()
        .min(2, 'City must be at least 2 characters')
        .max(50, 'City must be less than 50 characters')
        .required('City is required'),
    state: Yup.string()
        .length(2, 'State must be a 2 letter abbreviation')
        .required('State is required'),
    zip: Yup.string()
        .matches(/^\d{5}(-\d{4})?$/, 'Zip code must be in format "12345" or "12345-6789"')
        .required('Zip code is required'),
    comments: Yup.string()
        .max(500, 'Comment must be less than 500 characters')

})
