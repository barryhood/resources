    /**
    * Accepts an element and (optional) attribute, returns object populated data - attribute must
    * be in style format i.e. attr="key: value; key: value;"
    * attr can be overridden (e.g. if we're fetching from a data attribute instead of style)
    * @method fetchInlineStyles
    * @param elem {HTMLElement} DOM element node to check against
    * @param attr {String} (optional) Attribute to search on, defaults to style
    */
   fetchInlineStyles: function(elem, attr='style') {
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
},