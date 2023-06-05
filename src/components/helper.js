import { jsPDF } from "jspdf";

export const extractImageName = (filename) => {
  const nameWithExtension = filename.split("\\").pop(); // Récupère le nom de fichier avec l'extension
  const nameWithoutExtension = nameWithExtension.split(".").slice(0, -1).join("."); // Supprime l'extension du nom de fichier
  return nameWithoutExtension;
};

export const mergeWineInfosByRef = ({ winesData, imagesData }) =>
  winesData.map((wine) => {
    const matchingImage = imagesData.find((image) => image.ref.toLowerCase() === wine.bottleRef.toLowerCase());
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
    };
  });

export const filterAndSortWineList = ({ wineList, setFilteredWinesList, searchText, sortBy }) => {
  // Filtrer les bouteilles de vin en fonction du texte de recherche
  let filteredList = wineList.filter((wine) => wine.name.toLowerCase().includes(searchText.toLowerCase()));

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

export const exportVinanticPdf = (winesList) => {
  console.info("handleGeneratePdf", winesList);

  if (winesList.length !== 0) {
    /* GET NAVIGATOR WIDTH */
    const HTML_Width = 1000;

    /* SET PDF SIZE */
    const MARGIN = 40;
    var PDF_Width = HTML_Width;
    var PDF_Height = PDF_Width * 1.414;

    /* CREATE MAIN PDF DIV */
    const globalDivPdf = document.createElement("div");
    globalDivPdf.style.cssText = "display: flex; flex-direction: column";
    globalDivPdf.style.marginLeft = `${MARGIN}px`;
    globalDivPdf.style.width = `${HTML_Width - MARGIN * 2}px`;

    /* CREATE HEADER */
    const header = document.createElement("div");
    header.style.cssText = "display: flex; flex-direction: column; text-align: center; justify-content: center; letter-spacing: 5px";
    header.style.width = HTML_Width - MARGIN * 2 + "px";
    header.style.height = PDF_Height + "px";

    /* CREATE TITLE */
    const pdfTitre = document.createElement("h1");
    pdfTitre.innerText = "VINANTIC";
    header.append(pdfTitre);

    /* CREATE SUB-TITLE */
    const pdfSousTitre = document.createElement("h3");
    pdfSousTitre.innerText = `Millésimes de 1940 à 2008`;
    header.append(pdfSousTitre);

    // ADD HEADER TO MAIN PDF DIV
    globalDivPdf.append(header);

    /* ***************** */
    /* ***************** */

    /* CREATE PDF HANDLE */
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [PDF_Width, PDF_Height],
    });

    /* ADD AND SAVE MAIN DIV TO PDF SPLIT PAGE OPTION (PDF_Height) */
    pdf.html(globalDivPdf, { pagesplit: true }).then(() => {
      pdf.save("Catalogue de vins - Vinantic.pdf");
    });
  }
};


