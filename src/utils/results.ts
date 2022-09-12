export const generateResultText = (result: object, url:string) => {
  let text = "Hey! Check out my Wordle score in Signle App\n";
  Object.entries(result).forEach((key, index) => {
    Object.entries(key[1]).forEach((key: any, index) => {
      key[1].guess === "CORRECT_SPOT"
        ? (text = text + `\u{1F7E9} `)
        : key[1].guess === "WRONG_SPOT"
        ? (text = text + `\u{1F7E8} `)
        : (text = text + `\u{2B1C} `);
    });
    text = text + "\n";
  });
  text = text + "Check it out at: " + url;
  return text;
};
