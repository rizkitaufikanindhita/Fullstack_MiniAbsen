const express = require("express");
const router = express.Router();

const response = require("../utils/response");

const User = require("../models/users"); // mysql

const bcrypt = require("bcrypt");

const checkNip = require("../utils/checkNip");
const comparedPassword = require("../utils/comparedPassword");

router.get("/", async (req, res) => {
  const data = await User.findAll();

  response(200, data, "user route", res);
});

router.post("/post", async (req, res) => {
  const { nip, nama, password } = req.body;
  const passwordEncrypted = await bcrypt.hash(password, 10);

  const data = await User.create({
    nip,
    nama,
    password: passwordEncrypted,
  });
  response(200, data, "data berhasil ditambah", res);
});

router.post("/login", async (req, res) => {
  const { nip, password } = req.body;

  try {
    // dengan try and error, ketika nip salah api tidak akan mati
    const user = await checkNip(nip);

    const comparePassword = await comparedPassword(nip, password);
    if (comparePassword) {
      response(200, user, "Login berhasil", res);
    } else {
      response(400, null, "Password salah", res);
    }
  } catch (error) {
    response(500, null, "NIP Salah", res);
  }
});

router.put("/update", async (req, res) => {
  const { nip, nama, password, passwordBaru } = req.body;
  try {
    const user = await checkNip(nip);
    if (!user) return response(400, null, "user tidak ditemukan", res);

    const comparePassword = await comparedPassword(nip, password);
    if (comparePassword) {
      const passwordEncrypted = await bcrypt.hash(passwordBaru, 10);
      const data = await User.update(
        {
          nama: nama,
          password: passwordEncrypted,
        },
        { where: { nip: nip } }
      );
      response(200, data, "edit berhasil", res);
    } else {
      response(400, null, "password salah", res);
    }
  } catch {
    response(500, null, "NIP Salah", res);
  }
});

router.delete("/delete", async (req, res) => {
  const { nip, password } = req.body;

  const user = await checkNip(nip);
  !user ? response(400, null, "user tidak ditemukan", res) : null;

  const comparePassword = await comparedPassword(nip, password);

  if (comparePassword) {
    const data = await User.destroy({ where: { nip: nip } });
    response(200, data, "delete berhasil", res);
  } else {
    response(400, null, "password salah", res);
  }
});

module.exports = router;
