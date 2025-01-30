import { useContext, useEffect, useState } from "react";
import { SearchIcon } from "../assets/icons/Svg";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";

function Home() {
  const { fetchDetails } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [inputValue, setInputValue] = useState("batman");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const url = await axios.get(
        `https://www.omdbapi.com/?apikey=d1f24eaa&s=${inputValue}&type=${selectType}&page=${currentPage}`
      );
      setData(url.data.Search);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [inputValue, selectType, currentPage]);

  return (
    <>
      <Nav setSelectType={setSelectType} />
      <div className="bg-black">
        <div className="container mx-auto">
          <div className="text-center mt-10 p-4 lg:p-0">
            <label className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search Movie Title ..."
                className="w-full border p-2 lg:w-1/4 text-gray-700 focus:text-white focus:ring-1 focus:ring-[#f5c518] focus:outline-none"
              />
              <button
                onClick={() => fetchMovies()}
                className="flex absolute right-[4px] top-[-7px] bg-[#f5c518] p-1 text-black cursor-pointer hover:rounded-md"
              >
                <SearchIcon className="text-black" />
                Search
              </button>
            </label>
          </div>
          {loading ? (
            <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-gray-400">
              Loading...
            </p>
          ) : (
            <div className="mb-18">
              <div className="grid grid-rows-1 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-16 p-4 lg:p-0">
                {data && data.length > 0 ? (
                  data.map((movie) => {
                    return (
                      <div>
                        <div
                          key={movie.imdbID}
                          className="bg-[#121212] rounded-md"
                        >
                          <Link to={`/details/${movie.imdbID}`}>
                            <div class="relative">
                              <img
                                className="rounded-t-md w-full h-[300px] object-cover "
                                src={movie.Poster}
                                onClick={() => {
                                  fetchDetails(movie.imdbID);
                                }}
                              />
                              <div className="absolute inset-0 hover:shadow-inner hover:bg-black/30 transition-all duration-300"></div>
                            </div>
                          </Link>
                          <div className="p-4">
                            <p className="pb-2 text-sm">
                              <b className="text-md">Title:</b> {movie.Title}
                            </p>
                            <p className="text-sm">
                              <b className="text-md">Year of Release:</b>{" "}
                              {movie.Year}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-gray-400">
                    No movies found!
                  </p>
                )}
              </div>
              {data && data.length > 0 ? (
                <div className="flex justify-center mt-8">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3  bg-[#f5c518] text-black rounded-l-md cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-[gray-300]">
                    Page {currentPage}
                  </span>
                  <button
                    // disabled={currentPage === totalPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 bg-[#f5c518] text-black rounded-r-md cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
