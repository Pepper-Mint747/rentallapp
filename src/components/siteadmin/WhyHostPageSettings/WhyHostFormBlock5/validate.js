import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.paymentTitleHeading) {
    errors.paymentTitleHeading = messages.required;
  } else if (values.paymentTitleHeading.trim() == "") {
    errors.paymentTitleHeading = messages.required;
  } else if (values.paymentTitleHeading && values.paymentTitleHeading.length > 200) {
    errors.paymentTitleHeading = messages.exceedLimit;
  }

  if (!values.paymentTitle1) {
    errors.paymentTitle1 = messages.required;
  } else if (values.paymentTitle1.trim() == "") {
    errors.paymentTitle1 = messages.required;
  } else if (values.paymentTitle1 && values.paymentTitle1.length > 200) {
    errors.paymentTitle1 = messages.exceedLimit;
  }

  if (!values.paymentTitle2) {
    errors.paymentTitle2 = messages.required;
  } else if (values.paymentTitle2.trim() == "") {
    errors.paymentTitle2 = messages.required;
  } else if (values.paymentTitle2 && values.paymentTitle2.length > 200) {
    errors.paymentTitle2 = messages.exceedLimit;
  }

  if (!values.paymentTitle3) {
    errors.paymentTitle3 = messages.required;
  } else if (values.paymentTitle3.trim() == "") {
    errors.paymentTitle3 = messages.required;
  } else if (values.paymentTitle3 && values.paymentTitle3.length > 200) {
    errors.paymentTitle3 = messages.exceedLimit;
  }

  if (!values.paymentContent1) {
    errors.paymentContent1 = messages.required;
  } else if (values.paymentContent1.trim() == "") {
    errors.paymentContent1 = messages.required;
  } else if (values.paymentContent1 && values.paymentContent1.length > 400) {
    errors.paymentContent1 = messages.exceedLimit;
  }

  if (!values.paymentContent2) {
    errors.paymentContent2 = messages.required;
  } else if (values.paymentContent2.trim() == "") {
    errors.paymentContent2 = messages.required;
  } else if (values.paymentContent2 && values.paymentContent2.length > 400) {
    errors.paymentContent2 = messages.exceedLimit;
  }

  if (!values.paymentContent3) {
    errors.paymentContent3 = messages.required;
  } else if (values.paymentContent3.trim() == "") {
    errors.paymentContent3 = messages.required;
  } else if (values.paymentContent3 && values.paymentContent3.length > 400) {
    errors.paymentContent3 = messages.exceedLimit;
  }


  return errors
}

export default validate;