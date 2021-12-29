import messages from '../../../locale/messages';

// Helpers
import { isEuropeCountry } from '../../../helpers/europeCountryHelpers';

const validate = values => {

    const errors = {}

    if (!values.country) {
        errors.country = messages.required;
    }

    if (!values.city) {
        errors.city = messages.required;
    }

    if (!values.state) {
        errors.state = messages.required;
    }

    if (!values.zipcode) {
        errors.zipcode = messages.required;
    }

    if (!values.firstname || (values.firstname && values.firstname.toString().trim() == '')) {
        errors.firstname = messages.required;
    }

    if (values.businessType && values.businessType === "individual" 
        && (!values.lastname || (values.lastname && values.lastname.toString().trim() == ''))) {
        errors.lastname = messages.required;
    }

    if (values.country && ['US', 'CA'].indexOf(values.country) >= 0) {
        if (!values.routingNumber) {
            errors.routingNumber = messages.required;
        } else if(values.country === "CA") {
            if(values.routingNumber.length == 9 && ((isNaN(values.routingNumber.slice(0,5)) || (parseInt(values.routingNumber.slice(0,5), 10) < 1))  
                || values.routingNumber.charAt(5) !== '-' || (isNaN(values.routingNumber.slice(6, 9))))) {
                errors.routingNumber = messages.payoutRoutingInvalid;
            } else if(values.routingNumber.length == 8 && (isNaN(values.routingNumber) || (parseInt(values.routingNumber, 10) < 1))) {
                errors.routingNumber = messages.payoutRoutingInvalid;
            } else if(values.routingNumber.length < 8 || values.routingNumber.length > 9) {
                errors.routingNumber = messages.payoutRoutingInvalid;
            }
        } else if (isNaN(values.routingNumber) || (parseInt(values.routingNumber, 10) < 1)) {
            errors.routingNumber = messages.payoutRoutingInvalid;
        }
    }

    if (!values.accountNumber) {
        errors.accountNumber = messages.required;
    } else if (values.accountNumber && values.accountNumber.toString().trim() === '') {
        errors.accountNumber = isEuropeCountry(values.country) ? messages.ibanNumberInvalid : messages.accountNumberInvalid;
    }

    if (!values.confirmAccountNumber) {
        errors.confirmAccountNumber = messages.required;
    } else if (values.confirmAccountNumber && values.confirmAccountNumber.toString().trim() === '') {
        errors.confirmAccountNumber = isEuropeCountry(values.country) ? messages.confirmIbanNumberInvalid : messages.confirmAccountNumberInvalid;
    }

    if (values.confirmAccountNumber && values.accountNumber) {
        if (values.confirmAccountNumber !== values.accountNumber) {
            errors.confirmAccountNumber = isEuropeCountry(values.country) ? messages.confirmIbanNumberMismatch : messages.confirmAccountNumberMismatch;
        }
    }

    if (values.country && values.country === 'US' && values.businessType && values.businessType === "individual") {
        if (!values.ssn4Digits) {
            errors.ssn4Digits = messages.required;
        } else if (values.ssn4Digits) {
            if (isNaN(values.ssn4Digits) || (parseInt(values.ssn4Digits, 10) < 1)) {
                errors.ssn4Digits = messages.ssn4DigitsInvalid;
            }
        }
    }
    
    if (!values.businessType) {
        errors.businessType = messages.required;
    } 

    return errors
}

export default validate;