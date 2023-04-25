import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { db, moviesRef } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Movie } from "@mui/icons-material";
import { ThreeCircles } from "react-loader-spinner";
import Review from "./Review";

function Detail() {
  debugger;
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    year: "",
    Image: "",
    description: "",
    rating:0,
    rated:0
  });

  useEffect(() => {
    async function GetDataById() {
      setLoading(true);
      const _doc = doc(db, "Movie", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    GetDataById();
  }, []);
  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row md:items-start justify-center">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <ThreeCircles color="white" height={45} />
        </div>
      ) : (
        <>
          <img className="h-96 sticky top-24" src={data.image} />
          <div className="ml-4 w-1/2">
            <h1 className="text-2xl font-bold text-gray-600">
              {data.title}
              <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars size={20} half={true} 
            value={data.rating/data.rated} 
            edit={false}
             />
            <p className="mt-2 text-justify">{data.description}</p>
            <Review id={id} prevRating={data.rating} userRated={data.rated}/>
          </div>
        </>
      )}
    </div>
  );
}
export default Detail;
