import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoPng from "../utils/logo.png";

function forgetPassword() {
  const [email, setEmail] = useState("");
  return (
    <div className="container-full h-screen mx-auto flex justify-center items-center bg-gradient-to-r from-slate-500 to-slate-800">
      <div className=" min-w-20 h-96 w-120 flex justify-center items-center bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg m-5">
        <form action="" className="mx-auto md:w-full p-5">
          <div className="mb-10">
            <img src={logoPng} alt="" className="h-20   mx-auto" />
            <h1 className="text-white text-center m-2 text-xl font-semibold">
              Reset Your Password
            </h1>
            <div className="mb-4 text-start font-semibold text-slate-300 text-lg">
              Type your email to receive password reset instruction to your
              mailbox
            </div>
          </div>
          <div className="mb-5">
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Send Instructions
            </button>
            <Link className="text-white ms-10 hover:underline">
              Return to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default forgetPassword;
