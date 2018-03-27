
	/**
    * _set: Pass in an object to serialize to the URL/history object to give ability to retain state on back
    * _get: Pass an identifier to get back a deserialized object to use in your component
	*
    * @method historyManager
    * @param id {String} String identifier for param collection to be added to/retrieved from querystring
    * @param obj {Object} Object to be serialized (can be nested)
	*/
    historyManager: {
        // id = identifier for the data we want to pass
        // obj = the data we want to pass, this gets serialized here, associated with the id and passed to qs
        _set: function(id, obj) {
            const qs = window.location.search === '' ? {} : window.location.search.slice(1).split('&');
            let qsString = '';
            if(!id || $.isEmptyObject(obj)) {
                return;
            }
            // we have to serialize our object with $.param and also encode our &= values
            // in order to not trip up the getQuerystring util method
            obj = $.param(obj);
            obj = obj.replace(/=/g, '::');
            obj = obj.replace(/&/g, '||');
            if($.isEmptyObject(qs)) {
                qsString = `${id}=${obj}`;
            } else {
                let qsArray = {},
                    qsMatch = false;
                qs.map((pair) => {
                    const key = pair.split('=')[0];
                    const value = pair.split('=')[1];
                    if (!qsArray[key]) {
                        qsArray[key] = value;
                    } else {
                        if (!Array.isArray(qsArray[key])) {
                            qsArray[key] = [qsArray[key]];
                        }
                        qsArray[key].push(value);
                    }
                });
                qsArray[id] = obj;
                let tmpArray = [];

                for (const [key, value] of Object.entries(qsArray)) {
                    tmpArray.push(`${key}=${value}`);
                }
                qsString = tmpArray.join('&');
            }
            history.pushState(null, null, `?${qsString}`);
        },
        // retrieve our serialized data by id and deserialize before returning to user
        _get: function(id) {
            let qs = site.utils.getQuerystring(id);
            if($.isEmptyObject(qs) || !id || id === '') {
                return {};
            }
            qs = qs.replace(/::/g, '=');
            qs = qs.replace(/\|\|/g, '&');
            return site.utils.deParam(qs);
        },
    }




    // example usage from within component

            // pass an Object to the historyManager site util to get serialized to the querystring and pushed to history
            _setHistory: function() {
                let obj = {};
                if(this._selectedTab !== false) {
                    obj['tab'] = this._selectedTab;
                }
                if(this._selectedEngines !== false) {
                    obj['engine'] = this._selectedEngines;
                }
                site.utils.historyManager._set(this._elemClass + this._elemIndex,obj);
            },
    
            // retrieve our history and perform the appropriate actions to restore page state
            _getHistory: function() {
                let historyData = site.utils.historyManager._get(this._elemClass + this._elemIndex);
                if(historyData['tab']) {
                    $('.toggleLinksLink', this.$element).eq(historyData['tab']).click();
                }
                if(historyData['engine']) {
                    $('.toggleContentItem').eq(this._selectedTab).find('.DropdownSelect li', this.$element).eq(historyData['engine']).click();
                }
            }