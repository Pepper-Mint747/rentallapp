import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.blockTitle1) {
    errors.blockTitle1 = messages.required;
  } else if (values.blockTitle1.trim() == "") {
    errors.blockTitle1 = messages.blankSpace;
  } else if (values.blockTitle1.length > 35 ) {
    errors.blockTitle1 = messages.exceedLimit35
  }

  if (!values.blockContent1) {
    errors.blockContent1 = messages.required;
  } else if (values.blockContent1.trim() == "") {
    errors.blockContent1 = messages.blankSpace;
  } else if (values.blockContent1.length > 70 ) {
    errors.blockContent1 = messages.exceedLimit70
  }

  if (!values.blockTitle2) {
    errors.blockTitle2 = messages.required;
  } else if (values.blockTitle2.trim() == "") {
    errors.blockTitle2 = messages.blankSpace;
  } else if (values.blockTitle2.length > 35 ) {
    errors.blockTitle2 = messages.exceedLimit35
  }

  if (!values.blockContent2) {
    errors.blockContent2 = messages.required;
  } else if (values.blockContent2.trim() == "") {
    errors.blockContent2 = messages.blankSpace;
  } else if (values.blockContent2.length > 70 ) {
    errors.blockContent2 = messages.exceedLimit70
  }

  if (!values.blockTitle3) {
    errors.blockTitle3 = messages.required;
  } else if (values.blockTitle3.trim() == "") {
    errors.blockTitle3 = messages.blankSpace;
  } else if (values.blockTitle3.length > 35 ) {
    errors.blockTitle3 = messages.exceedLimit35
  }

  if (!values.blockContent3) {
    errors.blockContent3 = messages.required;
  } else if (values.blockContent3.trim() == "") {
    errors.blockContent3 = messages.blankSpace;
  } else if (values.blockContent3.length > 70 ) {
    errors.blockContent3 = messages.exceedLimit70
  }

  return errors
}

export default validate;