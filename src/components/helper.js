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

