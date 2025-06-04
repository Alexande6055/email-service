import functions from 'firebase-functions';
import nodemailer from 'nodemailer';
import {defineSecret} from 'firebase-functions/params';

// Definimos los secretos (Firebase) vh
const NODE_USER_CORREO = defineSecret('NODE_USER_CORREO');
const NODE_PASS_CORREO = defineSecret('NODE_PASS_CORREO');

// Creamos la función con los secretos dd
export const enviarCorreo = functions.https.onRequest({
  secrets: [NODE_USER_CORREO, NODE_PASS_CORREO],
}, async (req, res) => {
  const {
    destinatariosUnicos,
    asunto,
    html,
    correoGVinculacion,
  } = req.body;

  // Validación de campos
  if (!destinatariosUnicos || !asunto || !html || !correoGVinculacion) {
    res.status(400).json({error: 'Faltan datos para el envío del correo'});
    return;
  }

  try {
    // Obtenemos los secretos de Firebase
    const user = await NODE_USER_CORREO.value();
    const pass = await NODE_PASS_CORREO.value();

    // Creamos el transportador
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    // Definimos las opciones del correo
    const mailOptions = {
      from: `Unidad de Vinculación <${correoGVinculacion}>`,
      to: destinatariosUnicos,
      subject: asunto,
      html,
    };

    // Enviamos el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({error: error.message});
      }
      console.log('Correo enviado:', info.response);
      res.json({info, mensaje: 'Correo enviado exitosamente'});
    });
  } catch (err) {
    console.error('Error al obtener secretos:', err);
    res.status(500).json({error: 'Error interno del servidor'});
  }
});
