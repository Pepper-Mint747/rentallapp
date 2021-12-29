import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.coverSectionTitle1) {
    errors.coverSectionTitle1 = messages.required;
  } else if (values.coverSectionTitle1.trim() == "") {
    errors.coverSectionTitle1 = messages.required;
  } else if (values.coverSectionTitle1 && values.coverSectionTitle1.length > 200) {
    errors.coverSectionTitle1 = messages.exceedLimit;
  }

  if (!values.coverSectionContent1) {
    errors.coverSectionContent1 = messages.required;
  } else if (values.coverSectionContent1.trim() == "") {
    errors.coverSectionContent1 = messages.required;
  } else if (values.coverSectionContent1 && values.coverSectionContent1.length > 400) {
    errors.coverSectionContent1 = messages.exceedLimit;
  }

  if (!values.coverSectionContent2) {
    errors.coverSectionContent2 = messages.required;
  } else if (values.coverSectionContent2.trim() == "") {
    errors.coverSectionContent2 = messages.required;
  } else if (values.coverSectionContent2 && values.coverSectionContent2.length > 400) {
    errors.coverSectionContent2 = messages.exceedLimit;
  }

  if (!values.coverSectionFeature1) {
    errors.coverSectionFeature1 = messages.required;
  } else if (values.coverSectionFeature1.trim() == "") {
    errors.coverSectionFeature1 = messages.required;
  } else if (values.coverSectionFeature1 && values.coverSectionFeature1.length > 400) {
    errors.coverSectionFeature1 = messages.exceedLimit;
  }

  if (!values.coverSectionFeature2) {
    errors.coverSectionFeature2 = messages.required;
  } else if (values.coverSectionFeature2.trim() == "") {
    errors.coverSectionFeature2 = messages.required;
  } else if (values.coverSectionFeature2 && values.coverSectionFeature2.length > 400) {
    errors.coverSectionFeature2 = messages.exceedLimit;
  }

  if (!values.coverSectionFeature3) {
    errors.coverSectionFeature3 = messages.required;
  } else if (values.coverSectionFeature3.trim() == "") {
    errors.coverSectionFeature3 = messages.required;
  } else if (values.coverSectionFeature3 && values.coverSectionFeature3.length > 400) {
    errors.coverSectionFeature3 = messages.exceedLimit;
  }

  if (!values.coverSectionFeature4) {
    errors.coverSectionFeature4 = messages.required;
  } else if (values.coverSectionFeature4.trim() == "") {
    errors.coverSectionFeature4 = messages.required;
  } else if (values.coverSectionFeature4 && values.coverSectionFeature4.length > 400) {
    errors.coverSectionFeature4 = messages.exceedLimit;
  }

  if (!values.coverSectionFeature5) {
    errors.coverSectionFeature5 = messages.required;
  } else if (values.coverSectionFeature5.trim() == "") {
    errors.coverSectionFeature5 = messages.required;
  } else if (values.coverSectionFeature5 && values.coverSectionFeature5.length > 400) {
    errors.coverSectionFeature5 = messages.exceedLimit;
  }

  if (!values.coverSectionFeature6) {
    errors.coverSectionFeature6 = messages.required;
  } else if (values.coverSectionFeature6.trim() == "") {
    errors.coverSectionFeature6 = messages.required;
  } else if (values.coverSectionFeature6 && values.coverSectionFeature6.length > 400) {
    errors.coverSectionFeature6 = messages.exceedLimit;
  }

  return errors
}

export default validate;