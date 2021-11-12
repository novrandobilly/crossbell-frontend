export const splitParagraph = texts => {
  if (texts) {
    let paragraphArray = texts.split('\n').filter(par => par);
    return paragraphArray.map((paragraph, index) => <p key={`paragraph_${index}`}>{paragraph}</p>);
  }
};

export const thousandSeparator = number => {
  const stringNumber = number.toString();

  if (stringNumber.length > 3) {
    let tempArray = [];
    for (let i = stringNumber.length; i > 0; i -= 3) {
      if (i < 3) {
        tempArray.unshift(stringNumber.slice(0, i));
      } else {
        tempArray.unshift(stringNumber.slice(i - 3, i));
      }
    }
    return tempArray.join('.');
  }
  return stringNumber;
};
