class DxRangeSlider {
  constructor(element, options) {
    this.element = element;
    this.slider = null;
    this.customConnectClass = 'DxRangeSlider__custom-connect';
    this.customConnectNamespace = 'DxRangeSlider-custom-connects';
    this.smallHandleClass = 'DxRangeSlider--small-handles';

    // data attributes
    this.dataNameSpace = 'data-dxrangeslider-';
    this.dataConnectIndex = `${this.dataNameSpace}index`;
    this.dataIsInitialised = `${this.dataNameSpace}init`;
    this.dataTheme = `${this.dataNameSpace}theme`;

    const smallHandles = options.start.length > 1;
    const customConnectSpacing = smallHandles ? 12 : 27;

    this.defaults = {
      customConnectSpacing,
      smallHandles,
      theme: 'light', // light || dark
      direction: 'ltr', // ltr || rtl
    };

    this.options = Object.assign({}, this.defaults, options);
    this.createSlider();
  }

  updateOptions(options) {
    this.options = Object.assign(this.options, options);
  }

  createStartArray() {
    const { start } = this.options;
    return Array.isArray(start) ? start : [start];
  }

  createSlider() {
    if (this.isInitialised()) {
      return;
    }
    this.options.start = this.createStartArray();
    this.createCustomConnects();
    this.addCustomClasses();
    this.initSlider();
    this.addCustomConnectEvents();
  }

  addCustomClasses() {
    this.element.classList.add(`data-dxrangeslider-direction="${this.options.direction}"`);
    this.element.setAttribute(this.dataTheme, this.options.theme);
    if (this.options.smallHandles) {
      this.element.classList.add(this.smallHandleClass);
    }
  }

  initSlider() {
    this.slider = noUiSlider.create(this.element, this.options);
    this.setInitStatus('true');
  }

  destroySlider() {
    // remove our custom events, classes and DOM elements
    this.element.classList.remove(this.smallHandleClass);
    this.slider.off(`.${this.customConnectNamespace}`);
    const connects = this.element.querySelectorAll(`.${this.customConnectClass}`);
    connects.forEach(connect => connect.parentNode.removeChild(connect));

    // call noUiSlider destroy method
    this.slider.destroy();
    this.setInitStatus(null);
  }

  isInitialised() {
    return this.element.getAttribute(this.dataIsInitialised);
  }

  setInitStatus(status) {
    this.element.setAttribute(this.dataIsInitialised, status ? true : '');
  }

  createCustomConnects() {
    const createConnect = (index) => {
      const element = document.createElement('div');
      element.classList.add(this.customConnectClass);
      element.setAttribute(this.dataConnectIndex, index);
      return element;
    };
    this.element.appendChild(createConnect(0));
    this.options.start.forEach((handle, index) => this.element.appendChild(createConnect(index + 1)));
  }

  addCustomConnectEvents() {
    const alignment = this.options.direction === 'ltr' ? 'left' : 'right';
    const connectors = [...this.element.querySelectorAll(`[${this.dataConnectIndex}]`)];

    this.slider.on(`update.${this.customConnectNamespace}`, (...args) => {
      const positions = args[4];
      connectors.forEach((element, index) => {
        const connector = element;
        const isFirst = index === 0;
        const isLast = !connectors[index + 1];
        if (isFirst) {
          connector.style.width = `calc(${positions[0]}% - ${this.options.customConnectSpacing}px)`;
          connector.style[alignment] = '0px';
          return;
        }
        if (isLast) {
          connector.style.width = `calc(100% - ${positions[index - 1]}% - ${this.options.customConnectSpacing}px)`;
          connector.style[alignment] = `calc(${positions[index - 1]}% + ${this.options.customConnectSpacing}px)`;
          return;
        }
        const doubleSpacing = this.options.customConnectSpacing * 2;
        connector.style.width = `calc(${positions[index]}% - ${positions[index - 1]}% - ${doubleSpacing}px)`;
        connector.style[alignment] = `calc(${positions[index - 1]}% + ${this.options.customConnectSpacing}px)`;
      });
    });
  }
}


// EXAMPLES
const sliders = document.querySelectorAll('.DxRangeSlider');

const opts = {
  start: 5,
  range: {
    min: 0,
    max: 10
  }
};

// single handle
const slider1 = new DxRangeSlider(sliders[0], opts);

// dual handle
opts.start = [3, 7];
let slider2 = new DxRangeSlider(sliders[1], opts);

// EXAMPLE ABILITY TO DESTROY/RECREATE A SLIDER
const destroy = document.querySelector('.destroy');
destroy.addEventListener('click', (event) => {
  event.preventDefault();
  slider2.destroySlider();
});

const recreate1 = document.querySelector('.recreate1');
recreate1.addEventListener('click', (event) => {
  event.preventDefault();
  // slider2 = new DxRangeSlider(sliders[1], opts);
  slider2.updateOptions({
    start: 5,
    customConnectSpacing: 27,
    smallHandles: false
  });
  slider2.createSlider();
});

const recreate2 = document.querySelector('.recreate2');
recreate2.addEventListener('click', (event) => {
  event.preventDefault();
  slider2.updateOptions({
    start: [1, 9],
    customConnectSpacing: 12,
    theme: 'dark',
    smallHandles: true
  });
  slider2.createSlider();
});

const recreate3 = document.querySelector('.recreate3');
recreate3.addEventListener('click', (event) => {
  event.preventDefault();
  slider2.updateOptions({
    start: [2, 4, 6],
    customConnectSpacing: 12,
    smallHandles: true
  });
  slider2.createSlider();
});

const getInit = document.querySelector('.init');
getInit.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(slider2.isInitialised());
});



sliders.forEach((slider) => {
  slider.classList.add('visually-hidden');
  slider.addEventListener('focusin', (e) => {
    e.currentTarget.classList.remove('visually-hidden');
  });
  slider.addEventListener('focusout', (e) => {
    e.currentTarget.classList.add('visually-hidden');
  });  
});
