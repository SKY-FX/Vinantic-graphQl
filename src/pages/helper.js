export const transformBottles = (winesList) => {
  const filteredWinesList = [];

  winesList.forEach((obj) => {
    if (obj["Photo"] === "OK_main") {
      const bottleRef = obj["Référence"];
      const refNumber = bottleRef.replace("Ref_", "");
      const newImageRef = `OK_${refNumber}`;

      let count = 1;
      winesList.forEach((obj1) => {
        if (obj1["Photo"] === newImageRef) {
          count = count + 1;
        }
      });

      filteredWinesList.push({ ...obj, Quantity: count });
    }
  });

  return filteredWinesList;
};
