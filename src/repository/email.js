require('dotenv').config();
const transport = require('../lib/nodemailer');
const { User } = require('../models');

class EmailRepository {
  constructor() {
    this._userModel = User;
  }

  async sendEmail(subject, recipient, text, html) {
    await transport.sendMail({
      from: `"${process.env.NAME_SENDER}" <${process.env.SENDER_MAILER}>`,
      to: recipient,
      subject,
      text,
      html,
    });
  }

  async verifyEmail(email) {
    const result = await this._userModel.findOne({ where: { email } });
    return result;
  }
}

module.exports = EmailRepository;
