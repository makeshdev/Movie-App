function Nav({ setSelectType }) {
  return (
    <>
      <nav className="bg-[#121212]">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-boldtext-3xl font-bold">
              Movie{" "}
              <span className="bg-[#f5c518] text-black font-bold uppercase p-1">
                Search
              </span>
            </h1>
            <select
              onChange={(e) => setSelectType(e.target.value)}
              className="bg-[#121212] border text-gray-200 py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#f5c518] focus:border-[#f5c518]"
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="game">Game</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
