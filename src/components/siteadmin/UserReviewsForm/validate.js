import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    // if (!values.listId) {
    //     errors.listId = 'Provide list ID';
    // } else if (isNaN(values.listId)) {
    //     errors.listId = 'Only numeric values are allowed';
    // }

    if (!values.reviewContent) {
        errors.reviewContent = messages.reviewError1;
    }

    if (!values.rating) {
        errors.rating = messages.reviewError2;
    }

    return errors
}

export default validate;