/**
* Accepts one or more comma separated styles and an element
* returns true if any of the styles are declared inline on the element
* @method checkIfStyleInline
* @param str {String} Style or comma-separated list of styles to search on
* @param elem {DOM Node} Element to check against
*/

function checkIfStyleInline(str, elem) {
    if(!str || !elem) { return; }

    let styleFound = false;
    let styles = str.split(',').filter(part => part); // split string on comma, remove empty array field
    let inlineStyles = elem.getAttribute('style');
    if(!inlineStyles) {
      return false; // element has no inline styles
    }
  
    inlineStyles = inlineStyles.split(';').filter(part => part);
    styles = styles.map(style => {
      return style.toLowerCase().trim();
    });
  
    inlineStyles.forEach(inlineStyle => {
      inlineStyle = inlineStyle.split(':')[0].toLowerCase().trim();
      styles.forEach(style => {
         if(style === inlineStyle) {
           styleFound = true;
         }
      });
    });
    return styleFound;
}

console.log(checkIfStyleInline('str', document.querySelectorAll('.mydiv')[0]));
console.log(checkIfStyleInline('str, width', document.querySelectorAll('.mydiv2')[0]));
console.log(checkIfStyleInline('str, height', document.querySelectorAll('.mydiv3')[0]));