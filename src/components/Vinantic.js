import React, { useState } from "react";
import useVinantic from "../hooks/useVinantic";
import TextSearchInput from "./TextSearchInput";
import SearchSelector from "./SearchSelector";
import WineCard from "./WineCard";
import Title from "./Title";
import Pagination from "./Pagination";

const itemsPerPage = 70; // Nombre d'éléments à afficher par page

const Vinantic = () => {
  const { searchText, sortBy, wineList, handleSearchChange, handleSortChange } = useVinantic();

  const [currentPage, setCurrentPage] = useState(1);

  // Calcul de l'index de début et de fin de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWineList = wineList.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col bg-gray-50 px-5">
      <div className="my-10">
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

      <div className="mt-20">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={wineList.length}
          onPageChange={handlePageChange}
        />
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
          itemsPerPage={itemsPerPage}
          totalItems={wineList.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Vinantic;
