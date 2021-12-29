import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.itemName) {
    errors.itemName = messages.Required;
  }

  if (!values.otherItemName) {
    errors.otherItemName = messages.Required;
  }

  if (!Number(values.startValue) || Number(values.startValue) != parseInt(values.startValue, 10)) {
    errors.startValue = messages.startValueIsInvalid;
  }

  if (!Number(values.endValue) || Number(values.endValue) != parseInt(values.endValue, 10)) {
    errors.endValue = messages.endValueIsInvalid;
  }

  if (values.endValue < values.startValue) {
    errors.endValue = messages.endValueGreater;
  }

  return errors
}

export default validate