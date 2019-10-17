
class DxImageSlider {
  constructor(element, options) {

    this.element = element;
    this.customConnect = {
      before: null,
      after: null
    };
    this.customConnectSpacing = 27;

    this.createCustomConnects();

    this.slider = noUiSlider.create(this.element, {
        start: [5],
        connect: [1,1],
        range: {
            'min': 0,
            'max': 10
        }
    });

    this.addCustomConnectEvents();
  }

  createCustomConnects() {
    const createConnect = className => {
      const element = document.createElement('div');
      element.classList.add(className);
      return element;
    };

    this.customConnect.before = createConnect('DxImageSlider__connect-before');
    this.customConnect.after = createConnect('DxImageSlider__connect-after');

    this.element.appendChild(this.customConnect.before);
    this.element.appendChild(this.customConnect.after);
  }

  addCustomConnectEvents() {
    const customBefore = this.customConnect.before;
    const customAfter = this.customConnect.after;
    const getWidthCalc = value => `calc(${value}% - ${this.customConnectSpacing}px)`;

    this.slider.on('update.custom-connects', () => {
      const sliderCurrent = parseFloat(this.element.noUiSlider.get());
      customBefore.style.width = getWidthCalc(this.getValueAsPercentage(sliderCurrent));
      customAfter.style.width = getWidthCalc(100 - this.getValueAsPercentage(sliderCurrent));
    });
  }

  getValueAsPercentage(value) {
    const { min, max } = this.element.noUiSlider.options.range;
    return ((value - min) * 100) / (max - min);
  }
}

const element = document.querySelector('.DxImageSlider');
const dxImageSlider = new DxImageSlider(element);
