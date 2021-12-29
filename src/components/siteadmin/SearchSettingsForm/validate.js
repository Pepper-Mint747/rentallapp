import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    if (!values.minPrice || !values.minPrice.toString().trim()) {
        errors.minPrice = messages.required;
    }

    if (!values.maxPrice || !values.maxPrice.toString().trim()) {
        errors.maxPrice = messages.required;
    }

    if (isNaN(values.minPrice) || (parseInt(values.minPrice, 10) < 0)) {
        errors.minPrice = messages.onlyNumericKey;
    }

    if (isNaN(values.maxPrice) || (parseInt(values.maxPrice, 10) < 0)) {
        errors.maxPrice = messages.onlyNumericKey;
    } else if (parseFloat(values.maxPrice, 10) < parseFloat(values.minPrice, 10) || parseFloat(values.maxPrice, 10) === parseFloat(values.minPrice, 10)) {
        errors.maxPrice = messages.maxPriceGreater
    }

    return errors
}

export default validate;