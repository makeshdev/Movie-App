import { createContext } from "react";
import Home from "./Home";

export const DataProvider = createContext();
function Context() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = await axios.get(
          "https://www.omdbapi.com/?apikey=d1f24eaa&s=batman"
        );
        setData(url.data.Search);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchApi();
  }, []);

  const allData = { data };
  return (
    <>
      <DataProvider.Provider value={allData}>
        <Home />
        <Details />
      </DataProvider.Provider>
    </>
  );
}

export default Context;
