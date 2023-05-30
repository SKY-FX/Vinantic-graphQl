import { useQuery } from "@apollo/client";
import { GET_BOTTLES } from "../graphql/bottleQueries";
import { GET_IMAGES } from "../graphql/imageQueries";
import { useEffect, useState } from "react";
import { extractImageName, filterAndSortWineList, mergeWineInfosByRef } from "../components/helper";

const useVinantic = () => {
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
      filterAndSortWineList({
        wineList: mergedWinesInfos,
        setFilteredWinesList,
        searchText,
        sortBy,
      });
    }
  }, [searchText, sortBy]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return {
    searchText,
    sortBy,
    wineList: filteredWinesList,
    handleSearchChange,
    handleSortChange
  };
};

export default useVinantic;
