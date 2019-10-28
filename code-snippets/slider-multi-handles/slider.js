class DxRangeSlider {
  constructor(element, options) {
    this.element = element;
    this.customConnectClass = 'DxRangeSlider__custom-connect';
    this.customConnectIndex = 'data-dxrangeslider-index';
    this.customConnectNamespace = 'DxRangeSlider-custom-connects';
    this.modifierClassPrepend = 'DxRangeSlider--';
    this.initAttribute = 'data-dxrangeslider-init';
    this.smallHandleClass = 'DxRangeSlider--small-handles';
    this.smallHandles = options.start.length > 1;

    this.defaults = {
      theme: 'light', // 'light' or 'dark'
      direction: 'ltr',
      customConnectSpacing: this.smallHandles ? 12 : 27 // spacing between centre of handle and edge of connector
    };

    this.options = Object.assign({}, this.defaults, options);
    this.createSlider();
  }

  updateOptions(options) {
    this.options = Object.assign(this.options, options);
  }

  createStartArray() {
    const start = this.options.start;
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
    this.element.classList.add(`${this.modifierClassPrepend}${this.options.theme}`);
    if (this.smallHandles) {
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
    console.log('this.element.getAttribute(this.initAttribute):', !!this.element.getAttribute(this.initAttribute));
    return this.element.getAttribute(this.initAttribute);
  }

  setInitStatus(status) {
    this.element.setAttribute(this.initAttribute, status ? true : '');
  }

  createCustomConnects() {
    const createConnect = (index) => {
      const element = document.createElement('div');
      element.classList.add(this.customConnectClass);
      element.setAttribute(this.customConnectIndex, index);
      return element;
    };
    this.element.appendChild(createConnect(0));
    console.log('this.options.start', this.options.start);
    this.options.start.forEach((handle, index) => this.element.appendChild(createConnect(index + 1)));
  }


  addCustomConnectEvents() {
    const alignment = this.options.direction === 'ltr' ? 'left' : 'right';
    const connectors = [...this.element.querySelectorAll(`[${this.customConnectIndex}]`)];
    const firstConnector = connectors[0];

    this.slider.on(`update.${this.customConnectNamespace}`, (...args) => {
      const positions = args[4];
      connectors.forEach((connector, index) => {
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
        const doubleSpacing =this.options.customConnectSpacing * 2;
        connector.style.width = `calc(${positions[index]}% - ${positions[index - 1]}% - ${doubleSpacing}px)`;
        connector.style[alignment] = `calc(${positions[index - 1]}% + ${this.options.customConnectSpacing}px)`;
      });
    });
  }

  setSmallHandles(status) {
    this.smallHandles = status;
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
  slider2.setSmallHandles(false);
  slider2.updateOptions({
    start: 5,
    customConnectSpacing: 27
  });
  slider2.createSlider();
});

const recreate2 = document.querySelector('.recreate2');
recreate2.addEventListener('click', (event) => {
  event.preventDefault();
  slider2.setSmallHandles(true);
  slider2.updateOptions({
    start: [1, 9],
    customConnectSpacing: 12,
    theme: 'dark'
  });
  slider2.createSlider();
});

const recreate3 = document.querySelector('.recreate3');
recreate3.addEventListener('click', (event) => {
  event.preventDefault();
  slider2.setSmallHandles(true);
  slider2.updateOptions({
    start: [2, 4, 6],
    customConnectSpacing: 12
  });
  slider2.createSlider();
});

const getInit = document.querySelector('.init');
getInit.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(slider2.isInitialised());
});