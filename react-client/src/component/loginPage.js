import { Fragment } from "react";
import React from "react";
import ReactTypingEffect from "react-typing-effect";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const navigate = useNavigate();

  const [getNIP, setNIP] = useState("");
  const [getPassword, setPassword] = useState("");

  const handleNIP = (e) => {
    const dataNIP = e.target.value;
    setNIP(dataNIP);
  };

  const handlePassword = (e) => {
    const dataPassword = e.target.value;
    setPassword(dataPassword);
  };

  const userLogin = () => {
    const dataLogin = {
      nip: getNIP,
      password: getPassword,
    };
    axios({
      // umpamain menggunakan postman biar mudah memahaminya
      method: "POST",
      url: "http://localhost:3000/users/login",
      data: dataLogin,
    })
      .then((result) => {
        console.log(result.data); // cek lokasi data
        localStorage.setItem("nip", result.data.payload.datas.user.nip); // setItem untuk menyimpan data di local storage (browser)
        localStorage.setItem("nama", result.data.payload.datas.user.nama); // setItem untuk menyimpan data di local storage (browser)
        navigate("/dashboard"); // redirect ke halaman dashboard
      })
      .catch((err) => alert(err.response.data.payload.message));
  };

  useEffect(() => {
    // useEffect untuk mengecek apakah sudah login atau belum
    if (localStorage.getItem("nip") && localStorage.getItem("nama")) {
      // jika sudah login
      navigate("/dashboard"); // redirect ke halaman dashboard
    }
  }, []);

  return (
    <Fragment>
      <div className="items-center justify-center mt-10 text-3xl font-semibold text-center">
        <ReactTypingEffect
          text={[props.title, props.description]}
          speed={100}
          eraseDelay={800}
          eraseSpeed={100}
          typingSpeed={100}
          typingDelay={100}
        />
      </div>
      <div className="items-center justify-center mt-10 text-center">
        <div className="p-5 m-auto border-2 shadow-xl border-slate-200 bg-slate-300 w-96 rounded-xl shadow-slate-400">
          <div className="p-4">
            <div className="grid grid-rows-2">
              <label className="text-lg font-bold text-left">NIP</label>
              <input
                placeholder="Masukkan NIP"
                className="p-3 text-sm border-2 rounded-lg shadow-xl border-slate-300"
                onChange={(e) => handleNIP(e)}
              ></input>
            </div>
            <div className="grid grid-rows-2">
              <label className="mt-4 text-lg font-bold text-left">
                Password
              </label>
              <input
                placeholder="••••••••"
                className="p-3 my-1 text-sm border-2 rounded-lg shadow-xl border-slate-300"
                type="password"
                onChange={(e) => handlePassword(e)}
              ></input>
            </div>
            <div className="mt-10">
              <button
                className="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded-lg shadow-xl hover:bg-blue-700 border-slate-300"
                onClick={() => {
                  userLogin();
                }}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
