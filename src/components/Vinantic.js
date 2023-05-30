import React from "react";
import useVinantic from "../hooks/useVinantic";
import TextSearchInput from "./TextSearchInput";
import SearchSelector from "./SearchSelector";
import WineCard from "./WineCard";
import Title from "./Title";

const Vinantic = () => {
  const {
    searchText,
    sortBy,
    wineList,
    handleSearchChange,
    handleSortChange,
  } = useVinantic();

  return (
    <div className="flex flex-col bg-gray-50 px-5">
      <div className="my-10">
        <Title />
      </div>

      <div className="flex flex-row">
        <div className="w-64">
          <TextSearchInput searchText={searchText} handleSearchChange={handleSearchChange} />
        </div>

        <div className="ml-10 w-64">
          <SearchSelector sortBy={sortBy} handleSortChange={handleSortChange} />
        </div>
      </div>

      <div className="grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 mt-10">
        {wineList.length !== 0 &&
          wineList.map((wine) => {
            <div key={wine.id}>
              <WineCard wine={wine} />
            </div>;
          })}
      </div>
    </div>
  );
};

export default Vinantic;
