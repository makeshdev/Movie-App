import { useContext, useEffect } from "react";
import { DataContext } from "../App";
import { Link, useParams } from "react-router-dom";
import Nav from "./Nav";
import { ArrowIcon, StarIcon } from "../assets/icons/Svg";

function Details() {
  const { fetchDetails, moviedetail } = useContext(DataContext);
  const { id } = useParams();

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  return (
    <>
      <Nav />
      <div className="container mx-auto max-w-6xl mt-6 mb-18">
        <div>
          <Link to="/">
            <p className="flex gap-1 items-center mb-4 lg:mb-10">
              <ArrowIcon className="text-amber-300" />
              <b className="hover:underline">Back</b>
            </p>
          </Link>
          <div className="flex justify-between items-center p-4 lg:p-0">
            <div>
              <h1 className="text-4xl font-semibold">{moviedetail.Title}</h1>
              <p className="py-2 flex items-center">
                <span className="text-sm">
                  {moviedetail.Released} - {moviedetail.Runtime}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold text-sm">IMDB RATING</p>
              <p className="flex items-center gap-1">
                <StarIcon className="text-amber-300" />
                <b className="text-xl">{moviedetail.imdbRating}</b>
                /10
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:flex-none lg:justify-normal">
            <img src={moviedetail.Poster} alt="" />
          </div>
          <div className="p-4 lg:p-0">
            {moviedetail.Genre ? (
              <ul className="flex gap-1">
                {moviedetail.Genre.split(",").map((i, index) => (
                  <li
                    key={index}
                    className="border border-amber-300 px-3 py-1 inline-block rounded-2xl my-4 leading-normal text-sm"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}

            <p>{moviedetail.Plot}</p>
            <ul className="mt-4">
              <li className="border-t border-[#121212] py-2">
                <b>Type: </b> {moviedetail.Type}
              </li>
              {moviedetail.Type === "series" ? (
                <li className="border-t border-[#121212] py-2">
                  <b>Total Seasons:</b> {moviedetail.totalSeasons}
                </li>
              ) : (
                ""
              )}
              <li className="border-t border-[#121212] py-2">
                <b>Director:</b> {moviedetail.Director}
              </li>
              <li className="border-t border-[#121212] py-2">
                <b>Writer:</b> {moviedetail.Writer}
              </li>
              <li className="border-t border-[#121212] py-2">
                <b>Stars:</b> {moviedetail.Actors}
              </li>
              <li className="border-t border-[#121212] py-2">
                <b>Language:</b> {moviedetail.Language}
              </li>
              <li className="border-t border-[#121212] py-2">
                <b>Awards:</b> {moviedetail.Awards}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
