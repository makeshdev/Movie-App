import { createContext, useState } from "react";
import Details from "./components/Details";
import Home from "./components/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import axios from "axios";

export const DataContext = createContext();
function App() {
  const [moviedetail, setMoviedetail] = useState([]);

  const fetchDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=d1f24eaa&i=${id}`
      );
      setMoviedetail(response.data);
    } catch (error) {
      console.log(error.message, "errror");
    }
  };

  const allData = {
    fetchDetails,
    moviedetail,
  };
  return (
    <>
      <Router>
        <DataContext.Provider value={allData}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </DataContext.Provider>
      </Router>
    </>
  );
}

export default App;
