export const splitParagraph = expParagraph => {
  if (expParagraph) {
    let paragraphArray = expParagraph.split('\n').filter(exp => exp);
    return paragraphArray.map((paragraph, index) => <p key={`paragraph_${index}`}>{paragraph}</p>);
  }
};
