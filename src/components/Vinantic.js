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
    <div>
      <h1>Vinantic</h1>

      <div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Recherche..."
        />
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">Trier par...</option>
          <option value="year">Année</option>
          <option value="price">Prix</option>
          <option value="name">Nom</option>
        </select>
      </div>

      <div className="grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {filteredWinesList.length !== 0 &&
          filteredWinesList.map(wine => (
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
