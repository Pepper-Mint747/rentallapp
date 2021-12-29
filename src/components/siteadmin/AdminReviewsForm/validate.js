import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.listId) {
    errors.listId = messages.provideListId;
  } else if (isNaN(values.listId)) {
    errors.listId = messages.onlyNumericKey;
  }

  if (!values.reviewContent) {
    errors.reviewContent = messages.reviewError1;
  } else if (values.reviewContent.trim() == "") {
    errors.reviewContent = messages.reviewError1;
}

  if (!values.rating) {
    errors.rating = messages.reviewError2;
  }

  return errors
}

export default validate;