import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { DELETE_ALL_BOTTLES } from "../graphql/bottleQueries";
import XLSX from "xlsx/dist/xlsx.full.min";
import { applySpec, compose, equals, map, prop, propOr, reject } from "ramda";
import { mapIndexed, notEqual } from "ramda-adjunct";
import { transformBottles } from "./helper";

const AdminPage = () => {
  const [backMessage, setBackMessage] = useState();
  const [winesList, setWinesList] = useState([]);

  const [
    deleteAllBottles,
    { loading: bottlesLoading, error: bottlesError, data: bottlesData },
  ] = useMutation(DELETE_ALL_BOTTLES);

  useEffect(() => {
    if (bottlesData) {
      const { message } = bottlesData.deleteAllBottles;
      setBackMessage(message);
    } else if (bottlesError) setBackMessage(bottlesError);
  }, [bottlesError, bottlesData]);

  useEffect(() => {
    if (backMessage)
      setTimeout(() => {
        setBackMessage(null);
      }, 3000);
  }, [backMessage]);

  const handleFileUpload = (event) => {
    if (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const bstr = event.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const filteredWines = compose(
          map(applySpec({
            year: propOr(0, "Année"),
            name: propOr("", "Château"),
            bottleType: propOr("", "Contenant"),
            price: propOr(0, "Prix sur le marché"),
            quality: propOr("", "Qualité"),
            bottleRef: (wine) => propOr("", "Référence", wine).toLowerCase(),
            wineType: propOr("", "Type"),
            city: propOr("", "Ville"),
            quantity: propOr(0, "Quantity"),
          })),
          transformBottles
        )(jsonData);

        console.info("wines", filteredWines);
        setWinesList(filteredWines);
      };

      reader.onerror = (error) => {
        setBackMessage(error);
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {bottlesLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        backMessage && (
          <p className="my-20 text-xl text-green-900">{backMessage}</p>
        )
      )}

      <button
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
        onClick={() => deleteAllBottles()}
      >
        DELETE ALL BOTTLES FROM BASE
      </button>

      <button
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
        onClick={() => deleteAllBottles()}
      >
        SET ALL BOTTLES TO BASE
      </button>

      <label
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 cursor-pointer mt-10"
        onChange={handleFileUpload}
        htmlFor="uploadFileInput"
      >
        <input id="uploadFileInput" className="hidden" type="file" />
        UPLOAD EXCEL FILE
      </label>

      <table className="table-auto w-full text-left mt-10">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Ville</th>
            <th className="px-4 py-2">Prix</th>
            <th className="px-4 py-2">Année</th>
            <th className="px-4 py-2">Qualité</th>
            <th className="px-4 py-2">Type de bouteille</th>
            <th className="px-4 py-2">Type de vin</th>
            <th className="px-4 py-2">Ref image</th>
            <th className="px-4 py-2">Quantité</th>
            <th className="px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {mapIndexed((bottle, idx) => {
            // const imageSrc = getImageSource({ bottle, imagesList });
            const imageSrc = "";

            return (
              <tr key={`bottle-${idx}`} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{prop("name", bottle)}</td>
                <td className="border px-4 py-2">{prop("city", bottle)}</td>
                <td className="border px-4 py-2">{prop("price", bottle)}</td>
                <td className="border px-4 py-2">{prop("year", bottle)}</td>
                <td className="border px-4 py-2">{prop("quality", bottle)}</td>
                <td className="border px-4 py-2">{prop("bottleType", bottle)}</td>
                <td className="border px-4 py-2">{prop("wineType", bottle)}</td>
                <td className="border px-4 py-2">{prop("bottleRef", bottle)}</td>
                <td className="border px-4 py-2">{prop("quantity", bottle)}</td>
                <td className="border px-4 py-2">
                  {/* <img
                    className="w-24"
                    src={imageSrc}
                    alt={prop("name", bottle)}
                  /> */}
                </td>
              </tr>
            );
          })(winesList)}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
