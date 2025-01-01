import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (resetLink) => {
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
    to: 'fardin01316049157@gmail.com', // list of receivers
    subject: 'Password change korte hobe', // Subject line
    text: 'Hello world? mone hoy password vule gesos.', // plain text body
    html: `<b>Hello world?
    password reset link: ${resetLink}
    </b>`, // html body
  });
};
