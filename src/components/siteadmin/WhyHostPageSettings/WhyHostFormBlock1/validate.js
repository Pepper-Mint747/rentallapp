import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.hostBannerTitle1) {
    errors.hostBannerTitle1 = messages.required;
  } else if (values.hostBannerTitle1.trim() == "") {
    errors.hostBannerTitle1 = messages.required;
  } else if (values.hostBannerTitle1 && values.hostBannerTitle1.length > 200) {
    errors.hostBannerTitle1 = messages.exceedLimit;
  }


  return errors
}

export default validate;