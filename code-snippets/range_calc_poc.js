
const journeyDistance = ['Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Short', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long', 'Long'];
const climate = ['Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'Off', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On', 'On'];
const preCon = ['Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'Off',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On',	'On'];
const wheel = ['Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"', 'Lowest Trim Car', '18"', 'Worst 18" Wheel', 'Best 20" Wheel', '20"', '22"'];
const speed = ['Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'City', 'City', 'City', 'City', 'City', 'City', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'City', 'City', 'City', 'City', 'City', 'City', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'City', 'City', 'City', 'City', 'City', 'City', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'City', 'City', 'City', 'City', 'City', 'City', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'City', 'City', 'City', 'City', 'City', 'City', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'Combined', 'City', 'City', 'City', 'City', 'City', 'City', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway'];

// console.log(journeyDistance.length);
// console.log(climate.length);
// console.log(wheel.length);
// console.log(speed.length);

journeyIndices = [];
journeyObject = {};
const elem = document.querySelector('.content');
elem.innerHTML = '';

// 18": 0, 20": 1, 22": 2;
const getWheelIndex = (str) => {
  const values = ['18"', '20"', '22"'];
  return values.indexOf(str);
}

// Combined: 0, City: 1, Highway: 2;
const getSpeedIndex = (str) => {
  const values = ['Combined', 'City', 'Highway'];
  return values.indexOf(str);
}

let i = 0;
journeyDistance.forEach((journey, index) => {

  const c = climate[index] === 'Off' ? 0 : 1;
  const w = getWheelIndex(wheel[index]);
  const s = getSpeedIndex(speed[index]);
  const div = document.createElement('div');
  let className = '';
  const html = (insertClass) => {
    return `
      ${index}<br>
      ${journeyDistance[index]}<br>
      <span class="${insertClass}">${climate[index]}</span><br>
      ${preCon[index]}<br>
      <span class="${insertClass}">${wheel[index]}</span><br>
      <span class="${insertClass}">${speed[index]}</span><br>
      -----<br>
      ${c}${w}${s}`;
  };

  if (preCon[index] !== 'On' && journeyDistance[index] !== 'Short' && wheel[index] !== 'Lowest Trim Car' && wheel[index] !== 'Worst 18" Wheel' && wheel[index] !== 'Best 20" Wheel') {
    const key = `${c}${w}${s}`;
    if (journeyObject[key]) {
      throw new Error('key already exists, this should never happen!');
    }
    journeyObject[key] = index;
    className = 'active';
  }

  div.innerHTML = html(className);
  elem.appendChild(div);  
});

// this is our object with the keys and lookup cell indices we will need to replicate in the component
console.log(journeyObject);

