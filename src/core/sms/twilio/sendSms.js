import { sms, sitename } from '../../../config';
import twilio from 'twilio';

import { updateVerificationCode, getCountryCode } from './helpers/dbFunctions';

const client = new twilio(sms.twilio.accountSid, sms.twilio.authToken);

const TwilioSms = app => {
    app.post('/send-verification-code', async function (req, res) {
        let responseStatus = 200, errorMessage;
        let phoneNumber = req.body.phoneNumber;
        let dialCode = req.body.dialCode;
        let verificationCode = Math.floor(1000 + Math.random() * 9000);
        let message = sitename + ' security code: ' + verificationCode;
        message += '. Use this to finish verification.';
        let userId = req.user.id;

        
        let convertedNumber = dialCode + phoneNumber;

        try {

            await updateVerificationCode(verificationCode, userId);

            const responseData = await client.messages
                .create({
                    body: message,
                    from: sms.twilio.phoneNumber,
                    to: convertedNumber
                });

        } catch (error) {
            responseStatus = 400;
            errorMessage = error.message;
        }



        res.send({ status: responseStatus, errorMessage });
    });
};

export default TwilioSms;