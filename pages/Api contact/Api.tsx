// src/pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Configurez votre transporteur SMTP ici
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Remplacez par l'hôte SMTP de votre service
      port: 587, // Port SMTP (souvent 587 ou 465)
      auth: {
        user: 'filplurilingue@gmail.com', // Votre adresse email
        pass: 'sevres92310', // Votre mot de passe
      },
    });

    const mailOptions = {
      from: email,
      to: 'filplurilingue@gmail.com ', // L'adresse email vers laquelle vous souhaitez envoyer les messages
      subject: `Message from ${name}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
