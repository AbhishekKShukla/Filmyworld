// import React, { useContext, useState } from "react";
// import { TailSpin } from "react-loader-spinner";
// import { Link,useNavigate } from "react-router-dom";
// import {query, where, getDocs} from 'firebase/firestore'
// import { usersRef } from "../firebase/Firebase";
// import { Appstate } from "../App";
// import bcrypt from 'bcryptjs'
// import swal from "sweetalert";

// function Login() {
//     const navigate = useNavigate();
//     const useAppstate = useContext(Appstate);
//   const [form, setForm] = useState({
//     mobile:"",
//     password:""
//   });
//   const [loading, setLoading] = useState(false);
//   const signIn=async()=>{
//     debugger;
//     setLoading(true);
//     try {
//         const quer = query(usersRef, where('mobile', '==', form.mobile))
//         const querySnapshot = await getDocs(quer);
  
//         querySnapshot.forEach((doc) => {
//           const _data = doc.data();
//           const isUser = bcrypt.compareSync(form.password, _data.password);
//           if(isUser) {
//             debugger;
//             useAppstate.setUserLogin(true);
//             useAppstate.setUserName(_data.name);
//             swal({
//               title: "Logged In",
//               icon: "success",
//               buttons: false,
//               timer: 3000
//             })
//             navigate('/')
//           } else {
//             swal({
//               title: "Invalid Credentials",
//               icon: "error",
//               buttons: false,
//               timer: 3000
//             })
//           }
//         })
//       } catch (error) {
//         swal({
//           title: error.message,
//           icon: "error",
//           buttons: false,
//           timer: 3000
//         })
//       }
//       setLoading(false);
//   }
//   return (
//     <div className="w-full mt-10 flex flex-col items-center">
//       <h1 className="text-xl fomt-bold">Login</h1>

//       <div className="p-2 w-full md:w-1/3">
//         <div className="relative">
//           <label for="message" className="leading-7 text-sm text-gray-300">
//             Mobile No.
//           </label>
//           <input
//           type={"number"}
//             id="message"
//             value={form.mobile}
//             onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//             name="message"
//             className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//           />
//         </div>
//       </div>
//       <div className="p-2 w-full md:w-1/3">
//         <div className="relative">
//           <label for="message" className="leading-7 text-sm text-gray-300">
//            Password
//           </label>
//           <input
//             id="message"
//             type={"password"}
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             name="message"
//             className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//           />
//         </div>
//       </div>
//       <div className="p-2 w-full">
//         <button
//         onClick={signIn}
//           className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
//         >
//           {loading ? <TailSpin height={25} color="white" /> : "Login"}
//         </button>
//       </div>
//       <div>
//         <p>Do not have account? <Link to='/signup'> <span className="text-blue-500">Sign up</span></Link></p>
//       </div>
//     </div>
//   );
// }
// export default Login;

import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import { usersRef } from "../firebase/Firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    debugger;
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        debugger;
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
            debugger;
          useAppstate.setUserLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold">Login</h1>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            type={"number"}
            id="message"
            name="message"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
          type='password'
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full">
        <button
        onClick={login}
        className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>Do not have account? <Link to={'/signup'}><span className="text-blue-500">Sign Up</span></Link></p>
      </div>
    </div>
  );
};

export default Login;

