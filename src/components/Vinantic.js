import React, { useEffect, useState } from "react";
import useVinantic from "../hooks/useVinantic";
import TextSearchInput from "./TextSearchInput";
import SearchSelector from "./SearchSelector";
import WineCard from "./WineCard";
import Title from "./Title";
import Pagination from "./Pagination";
import { SEARCH_SELECTOR_OPTIONS } from "../constants";

const Vinantic = () => {
  const {
    currentPage,
    searchText,
    sortBy,
    totalItems,
    currentWineList,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
  } = useVinantic();

  return (
    <div className="flex flex-col bg-gray-100 px-5">
      <div className="my-10 text-stone-700">
        <Title />
      </div>

      <div className="flex flex-row">
        <div className="w-64">
          <TextSearchInput
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </div>

        <div className="ml-10 w-64">
          <SearchSelector sortBy={sortBy} handleSortChange={handleSortChange} />
        </div>
      </div>

      <div className="mt-10 p-5 border rounded-lg text-stone-500 bg-stone-200">
        {`Vous êtes sur la page ${currentPage} du catalogue. `}
        {totalItems !== 0
          ? `${totalItems} bouteilles sont disponibles. `
          : "Aucune bouteille n'est disponible. "}
        {sortBy !== SEARCH_SELECTOR_OPTIONS.NO_SORT
          ? `La liste ci-dessous a été triées.`
          : "La liste ci-dessous n'a pas été triées."}
      </div>

      <div className="grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 mt-10">
        {currentWineList.length !== 0 &&
          currentWineList.map((wine) => (
            <div key={wine.id}>
              <WineCard wine={wine} />
            </div>
          ))}
      </div>

      <div className="mt-20 mb-10">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Vinantic;
