   /**
    * Animate an object's height from 0 to auto or vice versa by calling slide.up/slide.down
    * equivalent to jQuery's $().slideUp()/$().slideDown()/$().slideToggle(); but does not
    * rely on jQuery (completely es6)
    * 
    * @namespace slide
    * @method up Animate from auto to 0
    * @method down Animate from 0 to auto
    * @method toggle Reverse current state
    * @param elem {HTMLElement} Element to animate
    * @param options {Object} Optional options object
    * @param callback {Function} Optional callback method
    */
   slide: {
    styles: {},
    computedStyles: {},
    parentPosition: '',
    animateSupport: true,
    options: {
        duration: 350,
        easing: 'ease-in-out' // currently only works with WAAPI method
    },
    elemDataClass: '',
    callback: null,
    up: function(elem, options={}, callback=()=>{}) {
        this._defaultParams(options, callback);
        this._doAnimation(elem, 'up');
    },
    down: function(elem, options={}, callback=()=>{}) {
        this._defaultParams(options, callback);
        this._doAnimation(elem, 'down');
    },
    toggle: function(elem, options={}, callback=()=>{}) {
        if(!elem) { return; }
        this._defaultParams(options, callback);
        if(elem.style.display !== 'none') {
            this._doAnimation(elem, 'up');
        } else {
            this._doAnimation(elem, 'down');
        }
    },
    _defaultParams: function(options, callback) {
        site.utils.deepExtend(this.options, options);
        this.callback = callback;
    },
    _doAnimation: function(elem, dir) {
        if(!elem) { return; }
        if(typeof elem.animate === 'undefined') {
            this.animateSupport = false;
        }
        this.styles = site.utils.fetchInlineStyles(elem);
        this.computedStyles = window.getComputedStyle(elem);
        let parentStyles = site.utils.fetchInlineStyles(elem.parentNode);

        // make it possible to calculate final height of our element
        elem.style.visibility = 'hidden';
        elem.style.display = 'block';
        elem.style.position = 'absolute';
        elem.style.height = 'auto';
        this.parentPosition = !parentStyles.position ? window.getComputedStyle(elem.parentNode).position : parentStyles.position;
        elem.parentNode.style.position = this.parentPosition !== 'static' ? this.parentPosition : 'relative';
        elem.style.width = !this.styles.width ? this.computedStyles.width : this.styles.width;

        // get the initial height/padding we'll need to either animate to or reinstate after animating
        let height = Number(window.getComputedStyle(elem).height.replace('px','')),
            paddingTop = Number(window.getComputedStyle(elem).paddingTop.replace('px','')),
            paddingBottom = Number(window.getComputedStyle(elem).paddingBottom.replace('px',''));

        elem.style.position = !this.styles.position ? '' : this.styles.position;
        elem.style.visibility = !this.styles.visibility ? '' : this.styles.visibility;
        elem.style.width = !this.styles.width ? '' : this.styles.width;
        elem.style.overflow = 'hidden';

        if(dir === 'down') {
            elem.style.height = 0;
            elem.style.paddingTop = 0;
            elem.style.paddingBottom = 0;
        }
        if(this.animateSupport) {
            this._animateWAAPI(elem, dir, parentStyles, height, paddingTop, paddingBottom);
        } else {
            this._animateRAF(elem, dir, parentStyles, height, paddingTop, paddingBottom);
        }
    },

    // fall back to requestAnimationFrame where WAAPI not supported
    _animateRAF: function(elem, dir, parentStyles, height, paddingTop, paddingBottom) {
        let that = this,
            animateSlide = null,
            stepHeight = height / (this.options.duration / 1000 * 60),
            stepPadTop = paddingTop / (this.options.duration / 1000 * 60),
            stepPadBottom = paddingBottom / (this.options.duration / 1000 * 60),
            totalHeight = 0,
            totalPadTop = 0,
            totalPadBottom = 0;

        function step(timestamp) {
            totalHeight = totalHeight + stepHeight;
            totalPadTop = totalPadTop + stepPadTop;
            totalPadBottom = totalPadBottom + stepPadBottom;

            if(dir === 'down') {
                elem.style.height = totalHeight + 'px';
                elem.style.paddingTop = totalPadTop + 'px';
                elem.style.paddingBottom = totalPadBottom + 'px';
            } else {
                elem.style.height = (height - totalHeight) + 'px';
                elem.style.paddingTop = (paddingTop - totalPadTop) + 'px';
                elem.style.paddingBottom = (paddingBottom - totalPadBottom) + 'px';
            }
            if(totalHeight < height) {
                window.requestAnimationFrame(step);
            } else {
                window.cancelAnimationFrame(animateSlide);
                that._cleanup(elem, dir, parentStyles, height, paddingTop, paddingBottom);
                that.callback();
            }
        }
        animateSlide = window.requestAnimationFrame(step);
    },

    // use Web Animation API where supported
    _animateWAAPI: function(elem, dir, parentStyles, height, paddingTop, paddingBottom) {
        let animateSlide = elem.animate([
            {
                height: 0,
                paddingTop: 0,
                paddingBottom: 0
            },
            {
                height: height + 'px',
                paddingTop: paddingTop + 'px',
                paddingBottom: paddingBottom + 'px'
            }
        ],{
            duration: this.options.duration,
            fill: 'forwards',
            easing: this.options.easing,
            direction: dir === 'down' ? 'normal' : 'reverse'
        });
        animateSlide.onfinish = () => {
            this._cleanup(elem, dir, parentStyles, height, paddingTop, paddingBottom);
            animateSlide.cancel();
            this.callback();
        };
    },

    _cleanup: function(elem, dir, parentStyles, height, paddingTop, paddingBottom) {
        elem.style.overflow = !this.styles.overflow ? '' : this.styles.overflow;
        elem.style.paddingTop = !this.styles.paddingTop ? '' : this.styles.paddingTop;
        elem.style.paddingBottom = !this.styles.paddingBottom ? '' : this.styles.paddingBottom;
        elem.parentNode.style.position = !parentStyles.position ? '' : parentStyles.position;
        if(dir === 'down') {
            elem.style.height = 'auto';
        } else {
            elem.style.display = 'none';
        }
    }

}