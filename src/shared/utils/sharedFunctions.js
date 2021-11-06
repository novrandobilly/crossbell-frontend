export const splitParagraph = texts => {
  if (texts) {
    let paragraphArray = texts.split('\n').filter(par => par);
    return paragraphArray.map((paragraph, index) => <p key={`paragraph_${index}`}>{paragraph}</p>);
  }
};
