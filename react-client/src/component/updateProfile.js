import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [getNama, setNama] = useState(localStorage.getItem("nama"));
  const [getPassword, setPassword] = useState("");
  const [getPasswordBaru, setPasswordBaru] = useState("");

  const dataResponding = {
    nip: localStorage.getItem("nip"),
    nama: getNama,
    password: getPassword,
    passwordBaru: getPasswordBaru,
  };

  const handleUpdate = () => {
    axios({
      method: "PUT",
      url: "http://localhost:3000/users/update",
      data: dataResponding,
    })
      .then(() => {
        alert("Update Berhasil, Silahkan Login Ulang");
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        alert("Password Salah");
      });
  };

  return (
    <Fragment>
      <div className="p-5 mt-5 border-2 shadow-xl rounded-xl mx-44 bg-slate-500">
        <div className="grid grid-row-2">
          <label className="mb-3 text-xl font-semibold text-white">Nama</label>
          <input
            placeholder="Nama"
            className="text-white bg-slate-500"
            onChange={(e) => {
              setNama(e.target.value);
            }}
            defaultValue={localStorage.getItem("nama")}
          />
        </div>
        <div className="grid mt-5 grid-row-2">
          <label className="mb-3 text-xl font-semibold text-white">
            Password Lama
          </label>
          <input
            placeholder="••••••••"
            type="password"
            className="text-white bg-slate-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="grid mt-5 grid-row-2">
          <label className="mb-3 text-xl font-semibold text-white">
            Password Baru
          </label>
          <input
            placeholder="Password Baru"
            type="text"
            className="text-white bg-slate-500"
            onChange={(e) => {
              setPasswordBaru(e.target.value);
            }}
          />
        </div>
        <p className="mt-5 text-xs text-white">
          Setelah dilakukan update, Anda diharuskan untuk login ulang
        </p>
        <button
          className="p-3 mt-5 font-semibold text-white shadow-sm shadow-white rounded-xl bg-slate-700"
          onClick={() => {
            handleUpdate();
          }}
        >
          Update
        </button>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
