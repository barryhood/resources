
(function ($, window, document) {

    // TO DO:
    // - A11y resource bundle text for "close" button functionality?
    // convert to non-jQuery component format (internally already uses es6)
    var Modal = {
        _defaults: {
            className: 'Modal',
            selector: '.Modal',
            speed: 350
        },
        _modal: null,
        _modalContent: null,
        _elem: null,

        init_rtl: function() {}, init: function() {
            this._elem = this.$element.get(0);
        },
        _attachModal: function() {
            let elem = document.createElement('section'),
                html = `
                    <div class="${this.options.className}__content-wrapper">
                        <button data-modal-close class="${this.options.className}__close"></button>
                        <div data-modal-content class="${this.options.className}__content"></div>
                    </div>
                `;
            elem.setAttribute('data-modal', '');
            elem.setAttribute('role', 'dialog');
            elem.classList.add(this.options.className);
            elem.innerHTML = html;
            document.body.appendChild(elem);
            this._modal = elem;
            this._modalContent = elem.querySelectorAll('[data-modal-content]')[0];

            let bg = document.createElement('div');
            bg.classList.add(`${this.options.className}__background`);
            bg.setAttribute('data-modal-close', '');
            elem.appendChild(bg);

            this._modal
                .querySelectorAll('[data-modal-close]')
                .forEach((closer) => {
                    closer.addEventListener('click', (event) => {
                        event.preventDefault();
                        this._close();
                    });
                });
        },
        _detachModal: function() {
            let modal = document.querySelectorAll(this.options.selector)[0];
            document.body.removeChild(modal);
        },
        _keyboardControls: function() {
            this._modal.querySelectorAll('[data-modal-close]')[0].focus();
            let tabbables = site.utils.getTabbable(this._modal);
            this._modal.addEventListener('keydown', (event) => {
                if (event.keyCode === 27) {
                    event.preventDefault();
                    this._close();
                }
            });
            if (tabbables.length === 1) {
                tabbables[0].addEventListener('keydown', (event) => {
                    if (event.keyCode === 9) {
                        event.preventDefault();
                        tabbables[0].focus();
                    }
                });
            } else {
                tabbables[0].addEventListener('keydown', (event) => {
                    if (event.shiftKey && event.keyCode === 9) {
                        event.preventDefault();
                        tabbables[tabbables.length - 1].focus();
                    }
                });
                tabbables[tabbables.length - 1].addEventListener(
                    'keydown',
                    (event) => {
                        if (!event.shiftKey && event.keyCode === 9) {
                            event.preventDefault();
                            tabbables[0].focus();
                        }
                    }
                );
            }
        },
        _open: function(el) {
            this._attachModal();
            this._modalContent.innerHTML = '';
            this._modalContent.appendChild(el.cloneNode(true));
            this._modal.style.display = 'block';
            this._elem.setAttribute('data-modal-return', 'true');

            requestAnimationFrame(() => {
                setTimeout(() => {
                    this._modal.style.opacity = 1;
                }, 10);
                setTimeout(() => {
                    this._keyboardControls();
                    this._eventTrigger(`${this.options.className}:opened`);
                }, this.options.speed);
            });
        },
        _close: function() {
            requestAnimationFrame(() => {
                this._modal.style.opacity = 0;
                setTimeout(() => {
                    this._modal.style.display = 'none';
                    this._eventTrigger(`${this.options.className}:closed`);
                    this._detachModal();
                    this._elem.focus();
                    let returnElem = document.querySelectorAll('[data-modal-return]')[0];
                    returnElem.focus();
                    returnElem.removeAttribute('data-modal-return');
                }, this.options.speed);
            });
        },
        _eventTrigger: function(eventType) {
            const event = new CustomEvent(eventType);
            this._elem.dispatchEvent(event);
        },
        // the component calling the modal handles binding events and passing in modal content using these public methods
        open: function(el) {
            this._open(el);
        }, close: function() {
            this._close();
        }};

    jQuery.createComponent('Modal', Modal);

})(jQuery, window, document);
