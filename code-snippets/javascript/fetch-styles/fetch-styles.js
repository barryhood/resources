/**
* Accepts an element and (optional) attribute
* returns object populated with style attribute format data
* i.e. attr="key: value; key: value;"
* @method fetchStyles
* @param elem {DOM Node} Element to check against
* @param attr {String} Attribute to search on, defaults to style
*/

function fetchStyles(elem, attr='style') {
    let inlineStyles = elem.getAttribute(attr),
        styleObject = {};
    if(!elem || !inlineStyles) {
      return styleObject;
    }
    inlineStyles = inlineStyles.split(';').filter(part => part); // split string, remove empty array field
    inlineStyles = inlineStyles.forEach(style => {
      let styleArray = style.split(':').filter(part => part);
      styleObject[styleArray[0].trim()] = styleArray[1].trim();
    });  
    return styleObject;
  }
  
  fetchStyles(document.querySelectorAll('.mydiv')[0]);