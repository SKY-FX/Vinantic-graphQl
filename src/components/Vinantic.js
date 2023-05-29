import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOTTLES } from "../graphql/bottleQueries";
import { GET_IMAGES } from "../graphql/imageQueries";
import { extractImageName, mergeWineInfosByRef } from "./helper";

const Vinantic = () => {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filteredWinesList, setFilteredWinesList] = useState([]);
  const [winesList, setWinesList] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [mergedWinesInfos, setMergedWinesInfos] = useState([]);

  const {
    loading: bottlesLoading,
    error: bottlesError,
    data: bottlesData,
  } = useQuery(GET_BOTTLES);
  const {
    loading: imagesLoading,
    error: imagesError,
    data: imagesData,
  } = useQuery(GET_IMAGES);

  useEffect(() => {
    if (!bottlesLoading && bottlesData) {
      const wineList = bottlesData.getBottles;
      setWinesList(wineList);
    }

    if (!imagesLoading && imagesData) {
      const images = imagesData.getImages;
      setImagesList(images);
    }
  }, [bottlesData, imagesData, imagesLoading, imagesData]);

  useEffect(() => {
    if (imagesList.length !== 0 && winesList.length !== 0) {
      const formattedImagesList = imagesList.map((image) => {
        const imageRef = extractImageName(image.filename);
        return { ...image, ref: imageRef };
      });

      const mergedWinesInfos = mergeWineInfosByRef(
        winesList,
        formattedImagesList
      );
      setMergedWinesInfos(mergedWinesInfos);
      setFilteredWinesList(mergedWinesInfos);
    }
  }, [imagesList, winesList]);

  useEffect(() => {
    if (mergedWinesInfos) {
      filterAndSortWineList(mergedWinesInfos);
    }
  }, [searchText, sortBy]);

  const filterAndSortWineList = wineList => {
    // Filtrer les bouteilles de vin en fonction du texte de recherche
    let filteredList = wineList.filter((wine) =>
      wine.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Trier les bouteilles de vin en fonction de l'option de tri sélectionnée
    if (sortBy === "year") {
      filteredList = filteredList.sort((a, b) => a.year - b.year);
    } else if (sortBy === "price") {
      filteredList = filteredList.sort((a, b) => a.price - b.price);
    } else if (sortBy === "name") {
      filteredList = filteredList.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Mettre à jour la liste des bouteilles de vin filtrées et triées
    setFilteredWinesList(filteredList);
  };

  const handleSearchChange = e => {
    setSearchText(e.target.value);
  };

  const handleSortChange = e => {
    setSortBy(e.target.value);
  };

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
