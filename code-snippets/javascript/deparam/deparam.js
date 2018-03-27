	/**
    * Reverses the process of jQuery's $.param method to take a string
    * and re-hydrate back into a (potentially nested) object
	*
	* @method deParam
	* @param query {String} The string which requires $.param reversal
	*/
    deParam: function(query) {
        const setValue = function setValueMethod(root, path, value) {
            if (path.length > 1) {
                const dir = path.shift();
                if (typeof root[dir] === 'undefined') {
                    root[dir] = path[0] === '' ? [] : {};
                }
                setValueMethod(root[dir], path, value);
            } else {
                if (root instanceof Array) {
                    root.push(value);
                } else {
                    root[path] = value;
                }
            }
        };
        const nvp = query.split('&');
        const data = {};
        for (let i = 0 ; i < nvp.length ; i++){
            const pair = nvp[i].split('=');
            const name = decodeURIComponent(pair[0]);
            const value = decodeURIComponent(pair[1]);
            let path = name.match(/(^[^\[]+)(\[.*\]$)?/);
            const first = path[1];
            if (path[2]) {
                path = path[2].match(/(?=\[(.*)\]$)/)[1].split('][')
            } else {
                path = [];
            }
            path.unshift(first);
            setValue(data, path, value);
        }
        return data;
      },