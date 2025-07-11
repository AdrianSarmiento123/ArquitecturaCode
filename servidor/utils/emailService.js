const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // 👈 ¡Desactiva validación del certificado!
  }
});

async function enviarCodigoRecuperacion(destino, codigo) {
  await transporter.sendMail({
    from: '"Tu App" <noreply@tuapp.com>',
    to: destino,
    subject: "Recuperación de Contraseña",
    html: `<p>Tu código de recuperación es: <b>${codigo}</b></p>`
  });
}

module.exports = { enviarCodigoRecuperacion };
