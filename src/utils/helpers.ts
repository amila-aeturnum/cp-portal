export const toFirstLetterCapital = (text: string) => {
  let tmp = "";
  if (text) {
    text
      .toLowerCase()
      .split("_")
      .forEach((e) => {
        tmp += `${e[0].toUpperCase()}${e.slice(1)} `;
      });
  }
  return tmp.trimEnd();
};
