export const extractImageName = (filename) => {
  const nameWithExtension = filename.split("\\").pop(); // Récupère le nom de fichier avec l'extension
  const nameWithoutExtension = nameWithExtension
    .split(".")
    .slice(0, -1)
    .join("."); // Supprime l'extension du nom de fichier
  return nameWithoutExtension;
};

export const mergeWineInfosByRef = (wineData, imageData) =>
  wineData.map((wine) => {
    const matchingImage = imageData.find(
      (image) => image.ref.toLowerCase() === wine.ref.toLowerCase()
    );

    if (matchingImage) {
      return {
        ...wine,
        data: matchingImage.data,
        contentType: matchingImage.contentType,
      };
    }

    return {
      ...wine,
      data: "",
      contentType: "",
    };
  });

export const filterAndSortWineList = ({ wineList, setFilteredWinesList, searchText, sortBy }) => {
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
