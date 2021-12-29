import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.quoteSectionTitle1) {
    errors.quoteSectionTitle1 = messages.required;
  } else if (values.quoteSectionTitle1.trim() == "") {
    errors.quoteSectionTitle1 = messages.required;
  } else if (values.quoteSectionTitle1 && values.quoteSectionTitle1.length > 200) {
    errors.quoteSectionTitle1 = messages.exceedLimit;
  }

  if (!values.quoteSectionTitle2) {
    errors.quoteSectionTitle2 = messages.required;
  } else if (values.quoteSectionTitle2.trim() == "") {
    errors.quoteSectionTitle2 = messages.required;
  } else if (values.quoteSectionTitle2 && values.quoteSectionTitle2.length > 200) {
    errors.quoteSectionTitle2 = messages.exceedLimit;
  }

  if (!values.quoteSectionContent1) {
    errors.quoteSectionContent1 = messages.required;
  } else if (values.quoteSectionContent1.trim() == "") {
    errors.quoteSectionContent1 = messages.required;
  } else if (values.quoteSectionContent1 && values.quoteSectionContent1.length > 400) {
    errors.quoteSectionContent1 = messages.exceedLimit;
  }

  if (!values.quoteSectionContent2) {
    errors.quoteSectionContent2 = messages.required;
  } else if (values.quoteSectionContent2.trim() == "") {
    errors.quoteSectionContent2 = messages.required;
  } else if (values.quoteSectionContent2 && values.quoteSectionContent2.length > 400) {
    errors.quoteSectionContent2 = messages.exceedLimit;
  }

  if (!values.quoteSectionButton1) {
    errors.quoteSectionButton1 = messages.required;
  } else if (values.quoteSectionButton1.trim() == "") {
    errors.quoteSectionButton1 = messages.required;
  } else if (values.quoteSectionButton1 && values.quoteSectionButton1.length > 50) {
    errors.quoteSectionButton1 = messages.exceedLimit;
  }

  if (!values.quoteSectionButton2) {
    errors.quoteSectionButton2 = messages.required;
  } else if (values.quoteSectionButton2.trim() == "") {
    errors.quoteSectionButton2 = messages.required;
  } else if (values.quoteSectionButton2 && values.quoteSectionButton2.length > 50) {
    errors.quoteSectionButton2 = messages.exceedLimit;
  }


  return errors
}

export default validate;