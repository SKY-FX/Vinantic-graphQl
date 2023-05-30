import React from "react";
import useVinantic from "../hooks/useVinantic";

const Vinantic = () => {
  const {
    searchText,
    sortBy,
    filteredWinesList,
    handleSearchChange,
    handleSortChange,
  } = useVinantic();

  return (
    <div className="flex flex-col bg-gray-50 px-5">
      <div className="my-10 font-tangerine font-thin text-9xl text-center">Vinantic</div>

      <div className="flex flex-row">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Recherche..."
          />
        </div>

        <div className="ml-10 w-64">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Aucun tri</option>
            <option value="year">Année</option>
            <option value="price">Prix</option>
            <option value="name">Nom</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 mt-10">
        {filteredWinesList.length !== 0 &&
          filteredWinesList.map((wine) => (
            <div key={wine.id} className="rounded-3xl shadow-md">
              <div className="bg-stone-100 flex flex-col border rounded-3xl h-full justify-between">
                <div className="flex flex-col items-center m-10">
                  {wine.data && (
                    <img
                      src={`data:${wine.contentType};base64,${wine.data}`}
                      alt={wine.ref}
                      className="border-2 border-stone-300 rounded-3xl transition duration-1000 ease-in-out transform hover:scale-150"
                    />
                  )}

                  <div className="flex flex-col items-center mt-7">
                    <p className="font-serif font-bold text-xl mb-2 text-gray-500">
                      {wine.name}
                    </p>
                    <p className="font-serif text-gray-700 text-base-sm mt-2">
                      {wine.year}
                    </p>
                  </div>
                </div>
              </div>
              {/* <p>{wine.price}</p>
              <p>{wine.quality}</p> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Vinantic;
