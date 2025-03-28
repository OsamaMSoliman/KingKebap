import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com',
  // port: 587, //465,
  // authMethod: 'PLAIN',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PSWRD,
  },
});

console.log({ user: process.env.EMAIL, pass: process.env.PSWRD });
