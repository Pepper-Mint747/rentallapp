import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.headerTitle) {
    errors.headerTitle = messages.required;
  } else if (values.headerTitle.trim() == "") {
    errors.headerTitle = messages.blankSpace;
  }

  if (!values.headerContent) {
    errors.headerContent = messages.required;
  } else if (values.headerContent.trim() == "") {
    errors.headerContent = messages.blankSpace;
  }

  if (!values.blockTitle1) {
    errors.blockTitle1 = messages.required;
  } else if (values.blockTitle1.trim() == "") {
    errors.blockTitle1 = messages.blankSpace;
  }

  if (!values.blockContent1) {
    errors.blockContent1 = messages.required;
  } else if (values.blockContent1.trim() == "") {
    errors.blockContent1 = messages.blankSpace;
  }

  if (!values.blockTitle2) {
    errors.blockTitle2 = messages.required;
  } else if (values.blockTitle2.trim() == "") {
    errors.blockTitle2 = messages.blankSpace;
  }

  if (!values.blockContent2) {
    errors.blockContent2 = messages.required;
  } else if (values.blockContent2.trim() == "") {
    errors.blockContent2 = messages.blankSpace;
  }

  return errors
}

export default validate;