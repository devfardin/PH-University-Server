import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'Production',
    // secure: true,
    auth: {
      user: 'contactfardin22@gmail.com',
      pass: 'nrik jalr otrt jpps',
    },
  });

  await transporter.sendMail({
    from: 'contactfardin22@gmail.com', // sender address
    to,
    subject: 'Reset Your Password', // Subject line
    text: `Reset your password using the following link: ${html}`, // plain text body
    // html,
  });
};
