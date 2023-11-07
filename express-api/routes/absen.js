const express = require("express");
const router = express.Router();

const response = require("../utils/response");

const bcrypt = require("bcrypt");

const Absen = require("../models/absen");

const checkNip = require("../utils/checkNip");
const comparedPassword = require("../utils/comparedPassword");

router.get("/", async (req, res) => {
  const data = await Absen.findAll();
  response(200, data, "absen route", res);
});

router.post("/checkin", async (req, res) => {
  const { user_nip } = req.body;

  try {
    const user = await checkNip(user_nip);
    !user ? response(400, null, "user tidak ditemukan", res) : null;

    const data = await Absen.create({
      user_nip: user_nip,
      status: "IN",
    });
    response(200, data, "checkin berhasil", res);
  } catch (error) {
    response(400, null, error.message, res);
  }
});

router.post("/checkout", async (req, res) => {
  const { user_nip } = req.body;

  try {
    const user = await checkNip(user_nip);
    !user ? response(400, null, "user tidak ditemukan", res) : null;

    const data = await Absen.create({
      user_nip: user_nip,
      status: "OUT",
    });
    response(200, data, "checkout berhasil", res);
  } catch (error) {
    response(400, null, error.message, res);
  }
});

module.exports = router;
