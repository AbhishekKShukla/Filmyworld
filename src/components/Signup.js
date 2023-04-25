import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import app from '../firebase/Firebase';
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const auth=getAuth(app);

function Signup() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name:"",
    mobile:"",
    password:""
  });
  const [loading, setLoading] = useState(false);
  const [otpSent,setOtpSent]=useState(false);
  const [OTP,setOTP]=useState("");

  const generateRecaptha = () => {
    debugger;
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }

  const requestOtp = () => {
    debugger;
      setLoading(true);
      generateRecaptha();
      let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
        })
  }

  const verifyOTP = () => {
    debugger;
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setLoading(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    debugger;
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile
      });
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div className="w-full mt-10 flex flex-col items-center">
      <h1 className="text-xl fomt-bold">Sign up</h1>
      {
        otpSent?
        <>
        <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="message" className="leading-7 text-sm text-gray-300">
            OTP
          </label>
          <input
          type={"number"}
            id="message"
            value={form.OTP}
            onChange={(e) => setOTP(e.target.value)}
            name="message"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full">
        <button
        onClick={verifyOTP}
          className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Confirm Otp"}
        </button>
      </div>
      <div>
        <p>Already have an account? <Link to='/login'> <span className="text-blue-500">Login</span></Link></p>
      </div>
        </>
        :
        <>
        <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="message" className="leading-7 text-sm text-gray-300">
            Name
          </label>
          <input
            id="messagename"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            name="messagename"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="message" className="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
          type={"number"}
            id="message"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            name="message"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="message" className="leading-7 text-sm text-gray-300">
           Password
          </label>
          <input
            id="message"
            type={"password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            name="message"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full">
        <button
        onClick={requestOtp}
          className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
        </button>
      </div>
      <div>
        <p>Already have an account? <Link to='/login'> <span className="text-blue-500">Login</span></Link></p>
      </div>
      <div id="recaptcha-container"></div>

        </>
      }
          </div>
  );
}
export default Signup;
