import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { audio,ThreeDots } from "react-loader-spinner";
import {getDocs} from 'firebase/firestore';
import {moviesRef} from '../firebase/Firebase';
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    async function getData(){
        debugger;
        setLoading(true);
        const _data=await getDocs(moviesRef);
        console.log(_data);
        _data.forEach((doc)=>{
            setData((prv)=>[...prv, {...(doc.data()),id:doc.id}])
        })
        setLoading(false);
    }
    getData();
  },[])

  return (
    <div className="flex flex-wrap justify-between p-3 mt-1">
      {loading?<div className="w-full flex justify-center items-center"><ThreeDots height={40} color="white" /></div>:
      data.map((e, i) => {
        debugger;
        return (
          <Link to={`/detail/${e.id}`}><div key={i}
            className="card font-medium shadow-lg p-2 hover:translate-y-3
             cursor-pointer md:mt-0 mt-6 transition-all duration-500">

            <img
              className="h-72"
              src={e.image}
            />
            <h2>
              <span className="text-gray-500">Name : </span>{e.title}
            </h2>
            <h2 className="flex items-center mt-1">
              <span className="text-gray-500">Rating : </span>
              <ReactStars size={20} half={true} 
              value={e.rating/e.rated} 
              edit={false} />
            </h2>
            <h2>
              <span className="text-gray-500">Years : </span>{e.year}
            </h2>
          </div></Link>
        );
      })}
      
    </div>
  );
};
export default Cards;
