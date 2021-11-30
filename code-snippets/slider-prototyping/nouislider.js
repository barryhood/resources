
const slider = document.querySelector('.DxSlider');

const dxSlider = noUiSlider.create(slider, {
  start: [20],
  connect: [true, true],
  keyboard: false,
  range: {
    min: 0,
    max: 100,
  },
  // step: 10,
  // padding: 10,
});
console.log(dxSlider);

const doSomething = (values, handle, unencoded, tap, positions) => {

  console.log('values:', values);
  console.log('tap:', tap);
  console.log('positions:', positions);

}


dxSlider.on('update', doSomething);




// const t = setTimeout(() => {
//   dxSlider.set(40);
// }, 2000);
