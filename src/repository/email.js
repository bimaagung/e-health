const nodemailerTransport = require('../libs/nodemailer');

class EmailRepository {
  constructor() {}
  async sendEmail(subject, recipient, text, html) {
    await nodemailerTransport.sendMail({
      from: `'${process.env.MAILER_SENDER_NAME}' <${process.env.MAILER_SENDER_EMAIL}>`,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    });
  }
}
module.exports = EmailRepository;
