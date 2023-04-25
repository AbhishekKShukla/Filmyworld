import { useState } from "react";
import {TailSpin} from 'react-loader-spinner';

import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/Firebase";
 import swal from 'sweetalert';

const AddMovie = () => {
    const [form,setForm]=useState({
        title:"",
        year:"",
        description:"",
        image:""
    });
    const [loading,setLoading]=useState(false);
    const addMovieDetail= async()=>{
        debugger
        try{
          setLoading(true);
        await addDoc(moviesRef,form);
        
        swal({
            title:"Successfully added",
            icon:"success",
            buttons:false,
            timer:3000
        })
       setLoading(false);
    }
    catch(err)
    {
        swal({
            title:err,
            icon:"error",
            buttons:false,
            timer:3000
        }) 
    }
    }
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-6 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={form.title}
                    onChange={(e)=>setForm({...form,title:e.target.value})}
                    name="name"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-gray-300">
                    Year
                  </label>
                  <input
                    type="email"
                    value={form.year}
                    onChange={(e)=>setForm({...form,year: e.target.value})}
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-gray-300">
                    Image Link
                  </label>
                  <input
                    id="message"
                    value={form.image}
                    onChange={(e)=>setForm({...form,image:e.target.value})}
                    name="message"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="message"
                    value={form.description}
                    onChange={(e)=>setForm({...form,description:e.target.value})}
                    name="message"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              
              <div className="p-2 w-full">
                <button onClick={addMovieDetail} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading?<TailSpin height={25} color="white"/>:'Submit'}
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AddMovie;
