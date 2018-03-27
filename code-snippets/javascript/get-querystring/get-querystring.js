	/**
    * Pass in an id to get the matching querystring param,
    * Pass no params to receive an object populated with the entire
    * querystring (also converts duplicate params into arrays)
	*
	* @method getQuerystring
	* @param id {String} Optional request/return parameter
	*/
    getQuerystring: function(id = false) {
        const qs = window.location.search === '' ? {} : window.location.search.slice(1).split('&'),
        qsObj = {};
        if($.isEmptyObject(qs)) {
            return;
        }
        qs.map((pair) => {
            const key = pair.split('=')[0];
            const value = pair.split('=')[1];
            if (!qsObj[key]) {
                qsObj[key] = value;
            } else {
                if (!Array.isArray(qsObj[key])) {
                    qsObj[key] = [qsObj[key]];
                }
                qsObj[key].push(value);
            }
        });
        if(id !== false) {
            return !qsObj[id] ? {} : qsObj[id];
        }
        return qsObj;
    },