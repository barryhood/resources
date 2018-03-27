    /**
    * Deep extend an object, accepts a target to clone to and a source to clone from
    * @method deepExtend
    * @param target {Object} Object whose properties you wish to extend
    * @param source {Object} Object to extend from
    */
   deepExtend: function (target, source) {
    for(var i in source) {
        target[i] = (typeof source[i] === 'object') ? site.utils.deepExtend(source[i].constructor(), source[i]) : source[i];
    }
    return target;
 },