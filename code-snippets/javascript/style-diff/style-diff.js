/*
Takes two elements as parameters, runs through all properties of
getComputedStyle and returns any differences between the elements
as an object (I wrote this when working with messy legacy CSS with
lots of overrides which was causing a difference in final computed
heights)

Example usage:
    let e1 = document.querySelectorAll('.e1')[0];
    let e2 = document.querySelectorAll('.e2')[0];
    console.log(styleDiff(e1, e2));

    see: https://codepen.io/delinear/pen/oqyJrK
*/
function styleDiff(e1, e2) {
    const props1 = window.getComputedStyle(e1);
    const props2 = window.getComputedStyle(e2);
    let obj = {};
    [...props1].forEach((val, key) => {
        if(props1[val] !== props2[val]) {
          obj[val] = [props1[val], props2[val]];
        }
    });
    return obj;
}
