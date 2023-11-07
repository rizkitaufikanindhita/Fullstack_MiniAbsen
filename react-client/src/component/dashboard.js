import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./updateProfile";
import axios from "axios";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [getData, setData] = useState([]);
  const [getAbsen, setAbsen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nip") && !localStorage.getItem("nama")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/absen",
    }).then((result) => {
      const data = result.data.payload.datas;
      setData(data);
    });
  }, [getAbsen]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const respondingData = {
    user_nip: localStorage.getItem("nip"),
  };

  const absensi = (params) => {
    axios({
      method: "POST",
      url: `http://localhost:3000/absen/${params}`,
      data: respondingData,
    }).then(() => {
      setAbsen(!getAbsen);
    });
  };

  return (
    <Fragment>
      <div className="p-5 mx-40">
        <div className="items-center justify-center mt-10 text-4xl font-bold text-left">
          {props.title}
        </div>
        <div className="items-center justify-center mt-10 text-2xl font-bold text-left">
          Welcome {localStorage.getItem("nama")}
        </div>
        <div className="items-center justify-center mt-3 text-xl font-bold text-left">
          NIP: {localStorage.getItem("nip")}
        </div>
      </div>

      <div className="px-5 mx-40">
        <div className="items-center justify-center p-2 mt-10 text-sm font-bold text-left text-white bg-red-500 border-2 shadow-xl rounded-xl w-fit hover:bg-red-800">
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>

      <UpdateProfile />

      <div className="p-5 mx-40">
        <div className="mt-10 bg-gray-500 shadow-xl rounded-2xl">
          <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-200">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          NIP
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Tanggal
                        </th>
                      </tr>
                    </thead>
                    {getData.map((item, index) => {
                      if (item.user_nip == localStorage.getItem("nip")) {
                        const createdAt = new Date(
                          item.createdAt
                        ).toLocaleDateString("id-ID");
                        // konversi format tanggal
                        return (
                          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr key={index}>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.user_nip}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.status}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-right">
                                {createdAt}
                              </td>
                            </tr>
                          </tbody>
                        );
                      }
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-5 mx-40">
          <button
            className="p-3 text-2xl font-semibold text-left text-white bg-blue-500 border-2 rounded-lg shadow-xl border-slate-300 hover:bg-blue-800"
            onClick={() => {
              absensi("checkin");
            }}
          >
            ClockIn
          </button>
        </div>

        <div className="items-end p-5 mx-40 text-right">
          <button
            className="p-3 text-2xl font-semibold text-right text-white bg-red-500 border-2 rounded-lg shadow-xl border-slate-300 hover:bg-red-800"
            onClick={() => {
              absensi("checkout");
            }}
          >
            ClockOut
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
