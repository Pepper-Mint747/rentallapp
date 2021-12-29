import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.siteName) {
    errors.siteName = messages.required && messages.required;
  }

  if (!values.siteTitle) {
    errors.siteTitle = messages.required && messages.required;
  }

  if (values.logoHeight) {
    if (isNaN(values.logoHeight)) {
      errors.logoHeight = messages.logoHeight && messages.logoHeight;
    }
  }

  if (values.logoWidth) {
    if (isNaN(values.logoWidth)) {
      errors.logoWidth = messages.logoWidth && messages.logoWidth;
    }
  }

  if(values.metaDescription && values.metaDescription.length > 255) {
    errors.metaDescription = messages.metaDescription && messages.metaDescription
  }

  if(values.metaKeyword && values.metaKeyword.length > 255) {
    errors.metaKeyword = messages.metaKeyword && messages.metaKeyword
  }

  if ( (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.playStoreUrl)) ){
    errors.playStoreUrl = messages.urlInvalid;
  }
  
  if ( (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.appStoreUrl)) ){
    errors.appStoreUrl = messages.urlInvalid;
  }

  if (!values.email) {
    errors.email = messages.required && messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid && messages.emailInvalid;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.required && messages.required;
  } else if (values.phoneNumber && values.phoneNumber.trim() == "") {
    errors.phoneNumber = messages.required && messages.required;
  } else if (values.phoneNumber.length > 30 ) {
    errors.phoneNumber = messages.phoneNumberLengthInvalid;
  }

  if (!values.address) {
    errors.address = messages.required && messages.required;
  }
  return errors
}

export default validate;
