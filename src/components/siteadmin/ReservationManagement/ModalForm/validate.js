import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (values.paymentMethodId == 1 && !values.paymentCurrency) {
    errors.paymentCurrency = messages.pleaseChooseCurreny;
  }

  return errors
}

export default validate;