
// class DxImageSlider {
//   constructor(element, start) {

//     this.element = element;
//     this.customConnect = {
//       before: null,
//       after: null
//     };
//     this.customConnectSpacing = 27;

//     this.createCustomConnects();

//     this.slider = noUiSlider.create(this.element, {
//         start,
//         // connect: [1,1],
//         range: {
//             'min': 0,
//             'max': 10
//         },
//         customSpacing: 27,
//     });

//     console.log('slider:', this.slider);

//     this.addCustomConnectEvents();
//   }

//   createCustomConnects() {
//     const createConnect = className => {
//       const element = document.createElement('div');
//       element.classList.add(className);
//       return element;
//     };

//     this.customConnect.before = createConnect('DxImageSlider__connect-before');
//     this.customConnect.after = createConnect('DxImageSlider__connect-after');

//     this.element.appendChild(this.customConnect.before);
//     this.element.appendChild(this.customConnect.after);
//   }

//   addCustomConnectEvents() {
//     const customBefore = this.customConnect.before;
//     const customAfter = this.customConnect.after;
//     const getWidthCalc = value => `calc(${value}% - ${this.customConnectSpacing}px)`;

//     this.slider.on('update.custom-connects', () => {
//       const sliderCurrent = parseFloat(this.element.noUiSlider.get());
//       customBefore.style.width = getWidthCalc(this.getValueAsPercentage(sliderCurrent));
//       customAfter.style.width = getWidthCalc(100 - this.getValueAsPercentage(sliderCurrent));
//     });
//   }

//   getValueAsPercentage(value) {
//     const { min, max } = this.element.noUiSlider.options.range;
//     return ((value - min) * 100) / (max - min);
//   }
// }



/*
  Usage: pass an element as the first parameter, the second parameter is an options object - this is based on
  the noUiSlider options: https://refreshless.com/nouislider/slider-options/

  If `start` is a single value, a one handle slider will be created. If `start` is an array of two values, a
  dual handle slider will be created. These are styled differently as per the Spark44 slider mini-briefs.

  NOTE: it is recommended not to change the connect values. This utility method hides the standard connects and
  creates its own custom connects in order to allow for the clipped spacing between the connects and the handle.
  Additionally, more than two handles are not currently supported as this was not a use case in the mini briefs.

  To hook into the slider events, use the noUiSlider events: https://refreshless.com/nouislider/events-callbacks/
  noUiSlider provided custom binding with namespacing and has two methods:

  To bind: `.on(event, callback)`
  To unbind: `.off(event)`

  Basic example of creating a slider and binding to the update event with custom namespacing:

  const slider = document.querySelector('.yourSlider');
  const options = {
    start: 50,
    range: { min: 0, max: 100 }
  };
  new DxRangeSlider(slider, options);

  // bind a custom namespaced event listener to the slider update event:
  slider.noUiSlider.on('update.myCustomNamespacing',  (values, handle, unencoded, tap, positions) => {
    // do something
  });

  // remove all custom namespaced event listeners
  slider.noUiSlider.off('.myCustomNamespacing');

  // values: Current slider values as an array, with formatting applied;
  // handle: Index number of the handle which caused the event to fire;
  // unencoded: Slider values as an array without formatting;
  // tap: (boolean) Is false if the user dragged the handle, true if the user tapped on the slider range;
  // positions: Left offset values of the handles as an array;
*/

class DxRangeSlider {
  constructor(element, options) {
    this.element = element;
    this.customConnectClass = 'DxRangeSlider__custom-connect';
    this.customConnectIndex = 'data-dxrangeslider-index';
    this.customConnectNamespace = 'DxRangeSlider-custom-connects';

    this.smallHandleClass = 'DxRangeSlider--small-handles';
    this.smallHandles = options.start.length > 1;

    this.defaults = {
      theme: 'light',
      direction: 'ltr',
      customConnectSpacing: this.smallHandles ? 12 : 27 // spacing between centre of handle and edge of connector
    };

    this.options = Object.assign({}, this.defaults, options);
    this.options.start = this.createStartArray();

    this.createSlider();
  }

  createStartArray() {
    const start = this.options.start;
    return Array.isArray(start) ? start : [start];
  }

  createSlider() {
    this.createCustomConnects();
    this.addCustomClasses();
    this.initSlider();
    this.addCustomConnectEvents();
  }

  addCustomClasses() {
    if (this.smallHandles) {
      this.element.classList.add(this.smallHandleClass);
    }
  }

  initSlider() {
    this.slider = noUiSlider.create(this.element, this.options);
  }

  destroySlider() {
    // remove our custom events, classes and DOM elements
    this.element.classList.remove(this.smallHandleClass);
    this.slider.off(`.${this.customConnectNamespace}`);
    const connects = this.element.querySelectorAll(`.${this.customConnectClass}`);
    connects.forEach(connect => connect.parentNode.removeChild(connect));

    // call noUiSlider destroy method
    this.slider.destroy();
  }

  createCustomConnects() {
    const createConnect = (index) => {
      const element = document.createElement('div');
      element.classList.add(this.customConnectClass);
      element.setAttribute(this.customConnectIndex, index);
      return element;
    };
    this.element.appendChild(createConnect(0));
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
}


const sliders = document.querySelectorAll('.DxRangeSlider');

const opts = {
  start: 5,
  range: {
    min: 0,
    max: 10
  }
};
const slider1 = new DxRangeSlider(sliders[0], opts);

opts.start = [3, 7];
let slider2 = new DxRangeSlider(sliders[1], opts);


const destroy = document.querySelector('.destroy');
const recreate = document.querySelector('.recreate');

destroy.addEventListener('click', (event) => {
  event.preventDefault();
  slider2.destroySlider();
});

recreate.addEventListener('click', (event) => {
  event.preventDefault();
  slider2 = new DxRangeSlider(sliders[1], opts);
});
