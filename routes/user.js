const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

router.post("/signup", (req, res, next) => {
  Usuario.find({ email: req.body.email })
    .exec()
    .then(usuario => {
      if (usuario.length >= 1) {
        return res.status(409).json({
          message: "El email ya existe"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const usuario = new Usuario({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            usuario
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "¡Usuario creado con éxito!"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  Usuario.find({ email: req.body.email })
    .exec()
    .then(usuario => {
      if (usuario.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, usuario[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: usuario[0].email,
              usuarioId: usuario[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:usuarioId", (req, res, next) => {
  Usuario.remove({ _id: req.params.usuarioId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Usuario borrado"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;