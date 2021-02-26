const express = require('express');
const bcryptjs = require("bcryptjs");
const router = express.Router();
const nodemailer = require('nodemailer');

//Establecer model
const Tarea = require('../models/tarea');
const Usuario = require("../models/usuario");
//Establecer model

//Mailer
router.post('/send-mail', async (req, res) => {
    const { user, email, password } = req.body;

    const contentHTML = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
		<tr>
			<td align="center" valign="top">
				<!-- Header -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center" class="p30-15" style="padding: 30px;">
							<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
								<tr>
									<td class="td"
										style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
										<!-- Header -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<th class="column" width="145"
													style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="img m-center"
																style="font-size:0pt; line-height:0pt; text-align:left;">
																<img src="../client/public/img/icon.png" width="86"
																	height="86" border="0" alt="" />
															</td>
														</tr>
													</table>
												</th>
												<th class="column-empty2" width="1"
													style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
												</th>
												<th class="column"
													style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="text-header"
																style="color:#999999; font-family:'Lato', Arial ,sans-serif; font-size:14px; line-height:18px; text-align:right;">
																<a href="#" target="_blank" class="link2"
																	style="color:#999999; text-decoration:none;"><span
																		class="link2"
																		style="color:#999999; text-decoration:none;">Tareas
																		Geek</span></a>
															</td>
														</tr>
													</table>
												</th>
											</tr>
										</table>
										<!-- END Header -->
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<!-- END Header -->

				<!-- Intro -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
					<tr>
						<td align="center">
							<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
								<tr>
									<td class="td"
										style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="fluid-img"
													style="border-bottom: 7px solid #00a2ff; font-size:0pt; line-height:0pt; text-align:left;">
													<img src="../../client/public/img/wallpaper.jpg" width="650"
														height="366" border="0" alt="" />
												</td>
											</tr>
											<tr>
												<td class="bbrr" bgcolor="#f4f4f4"
													style="border-radius:0px 0px 12px 12px;">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="p30-15" style="padding: 50px 30px 60px 30px;">
																<table width="100%" border="0" cellspacing="0"
																	cellpadding="0">
																	<tr>
																		<td class="h3 center pb25"
																			style="color:#000000; font-family:'Lato', Arial ,sans-serif; font-size:24px; line-height:32px; font-weight:bold; text-align:center; padding-bottom:25px;">
																			¡${user}, Bienvenid@ a Tareas Geek!
																		</td>
																	</tr>
																	<tr>
																		<td class="text-center pb25"
																			style="color:#777777; font-family:'Lato', Arial,sans-serif; font-size:17px; line-height:30px; text-align:center; padding-bottom:25px;">
																			Este correo es para que no olvides tus
																			credenciales. Si tienes algún problema, duda
																			o sugerencia puedes escribir a
																			<span class="link2"
																				style="color:#000000; text-decoration:none;">
																				juanpasinga@gmail.com
																			</span>
																			y serás
																			atendido lo antes posible.
																			<br>
																			<br>
																			Email: ${email}
																			<br>
																			Contraseña: ${password}
																		</td>
																	</tr>
																	<!-- Button -->
																	<tr>
																		<td align="center">
																			<table class="center" border="0"
																				cellspacing="0" cellpadding="0"
																				style="text-align:center;">
																				<tr>
																					<td class="text-button"
																						style="background:#ef3050; color:#ffffff; font-family:Arial ,sans-serif; font-size:14px; line-height:18px; padding:12px 20px; text-align:center; text-transform:uppercase; font-weight:bold; border-radius:22px;">
																						<a href="#" target="_blank"
																							class="link-white"
																							style="color:#ffffff; text-decoration:none;"><span
																								class="link-white"
																								style="color:#ffffff; text-decoration:none;">
																								Volver a la aplicación
																							</span></a>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																	<!-- END Button -->
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										<!-- END Intro -->
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<!-- END Intro -->

				<!-- Footer -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
					<tr>
						<td valign="top" align="center" class="p30-15" style="padding: 50px 0px 50px 0px;">
							<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
								<tr>
									<td class="td"
										style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="text-footer1 pb10"
													style="color:#999999; font-family:'Lato', Arial,sans-serif; font-size:14px; line-height:20px; text-align:center; padding-bottom:10px;">
													Tareas Geek - Un proyecto para Academia Geek</td>
											</tr>
											<tr>
												<td class="text-footer2 pb20"
													style="color:#999999; font-family:'Lato', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:20px;">
													Juan Pablo Salazar</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<!-- END Footer -->
			</td>
		</tr>
	</table>
    `

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        service: 'gmail',
        auth: {
            user: 'juanpasinga@gmail.com',
            pass: 'ngcfnsseyorrlszo'
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: '"¡Bienvenido a Tareas Geek!", <tareasgeek@gmail.com>',
        to: email,
        subject: "¡Bienvenido a Tareas Geek!",
        html: contentHTML
    })

    return res.json({
        message: '¡Enviado!'
    });
})
//Mailer

//Usuarios
router.get('/usuarios', (req, res) => {
    Usuario.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}); //Obtener todos los usuarios

router.post('/usuarios/register', (req, res) => {
    const data = req.body;

    let passwordHash = bcryptjs.hashSync(data.password, 9);

    data.password = passwordHash;

    const newUsuario = new Usuario(data);

    newUsuario.save((error) => {
        if (error) {
            return res.status(500).json({ message: 'Error en el servidor: ' + error });
        } else {
            return res.json({
                message: '¡Usuario guardado con éxito!'
                //passwordHash: passwordHash
            });
        }
    });
}) //Registrar usuario

router.post('/usuarios/login', async (req, res) => {
    const data = req.body;

    const datos = await Usuario.find({ email: data.email })
        .catch((error) => {
            return res.json({ message: 'Error obteniendo el usuario: ' + error });
        });

    const datadb = await JSON.parse(JSON.stringify(datos));

    const compare = await bcryptjs.compare(data.password, datadb[0].password).catch((error) => {
        return res.json({
            message: 'Error al comparar: ' + error,
            //datas:  'Data: ' + data.password + 'Datadb: ' + datadb[0].password
        });
    })

    if (compare) {
        return res.json({
            message: "¡Todo correcto!",
            datos: datadb
        })
    } else {
        return res.json({
            message: "Usuario o contraseña incorrectos"
        })
    }
});//Login

router.delete('/usuario/:id', async (req, res) => {
    const id = req.params.id;

    await Usuario.findByIdAndDelete(id);
    return res.json({
        msg: '¡Usuario eliminado con éxito!'
    })
})
//Usuarios

// Routes
router.get('/:id_usuario', (req, res) => {

    Tarea.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}); /*Obtiene las tareas de la db */

router.post('/save', (req, res) => {
    const data = req.body;

    console.log("Data: " + data);

    const newTarea = new Tarea(data);

    newTarea.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Error en el servidor' });
            return;
        }
        // Tarea
        return res.json({
            msg: '¡Tarea guardada con éxito!'
        });
    });
}); /*Petición para agregar tareas */

router.put('/:id', async (req, res) => {
    const { imagen, nombre, descripcion, prioridad, fecha } = req.body;
    const id = req.params.id;

    await Tarea.findByIdAndUpdate(id, {
        $set: req.body
    }, (err, resultset) => {
        if (err) {
            res.status(500).json({ msg: 'Error en el servidor' });
            return;
        } else {
            return res.json({
                msg: '¡Tarea actualizada con éxito!'
            })
        }

    })
}) /*Petición para editar tareas según su id */

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await Tarea.findByIdAndDelete(id).then(() => {
        return res.json({
            msg: '¡Tarea eliminada con éxito!'
        })
    });


}); /*Petición para borrar tareas según su id */



module.exports = router;