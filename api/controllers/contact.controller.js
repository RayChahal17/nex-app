import nodemailer from 'nodemailer';

export const sendContactEmail = async (req, res) => {
   const { name, email, message, city, service } = req.body;

   try {
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
      });

      const mailOptions = {
         from: email,
         to: process.env.EMAIL_USER,
         subject: `New Query from ${name}`,
         text: `Name: ${name}\nEmail: ${email}\nCity: ${city}\nService: ${service}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
         } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
         }
      });
   } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
   }
};
