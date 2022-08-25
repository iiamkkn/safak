// import mg from 'mailgun-js';
const mg = require('mailgun-js');
function mailgun() {
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
}

module.exports = mailgun;
