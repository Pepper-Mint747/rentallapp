import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.location) {
    errors.location = messages.required;
  } else if (values.location.trim() == "") {
    errors.location = messages.blankSpace;
  }

  if (!values.locationAddress) {
    errors.locationAddress = messages.required;
  } else if (values.locationAddress.trim() == "") {
    errors.locationAddress = messages.blankSpace;
  }

  return errors
}

export default validate