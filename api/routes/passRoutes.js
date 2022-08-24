const passRoutes = require('express').Router();

const mg = require('mailgun-js');
const fileUpload = require('express-fileupload');
const {
  forgotPasswordv1,
  resetPasswordv1,
} = require('../controllers/AuthController');

const app = express.Router();
app.use(fileUpload());

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

passRoutes.post('/password/forgot', forgotPasswordv1);
passRoutes.put('/password/reset/:token', resetPasswordv1);

module.exports = { passRoutes, mailgun };
