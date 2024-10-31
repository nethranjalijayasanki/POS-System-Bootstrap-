export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

export const validQuantity = (qty) => {
    const quantityRegex = /^0$|^[1-9][0-9]*$/;
    return quantityRegex.test(qty);
}

export const validPrice = (price) => {
    const priceRegex = /^\d{0,5}(?!(\.|,)0{2})(\.|,)\d{1,2}$/;
    return priceRegex.test(price)
}

export const validName = (name) => {
    const nameRegex = /^[a-z][a-z '-.,]{0,31}$|^$/i;
    return nameRegex.test(name)
}