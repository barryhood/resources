	/**
	 * Pass in a HTML Object, the method will return an object populated with all of the tabbable descendants
     * This should include: inputs, selects, textareas, buttons, a with href, anything else with a non-negative
     * tabindex EXCEPT where any of these elements are disabled or have a negative tabindex or are not visible
     * (or inside a container which is itself not visible)
     * 
     * NOTE: this doesn't currently account for a custom tabindex on the elements returned, they are just returned
     * in their DOM order - to account for custom tabindex values we'd have to parse elements with tabindex 
     * separately 
	 *
	 * @method tabbable
	 * @param {HTMLObject}
	 */
    function getTabbable(elem) {
        const selectorTypes = [
            'input:not([disabled]):not([hidden])',
            'select',
            'a[href]',
            'textarea',
            'button',
            '[tabindex]:not([tabindex^="-"]'
        ];
        let selectors = elem.querySelectorAll(selectorTypes.join(','));
        selectors = Array.from(selectors);
        selectors = selectors.filter((selector) => {
            let tabbable = true;
            if (!selector.offsetParent || selector.offsetWidth === 0 || selector.offsetHeight === 0) {
                tabbable = false;
            }
            function isInvisible(el) {
                if(el.style.visibility === 'hidden' || el.style.display === 'none') {
                    tabbable = false;
                } else if(el.parentNode && el.parentNode !== document.body) {
                    isInvisible(el.parentNode);
                }
            };
            isInvisible(selector);
            if (tabbable) {
                return selector;
            }
            return false;
        });
        return selectors;
    }