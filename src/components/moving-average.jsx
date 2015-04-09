// usege
// var ma = require('./moving-average');
// ma([1,2,3,4,5,6,7,8,9,10], 2); // -> [1, 1.5, 2.5, 3,5, 4.5, 5,5, 6.5, 7.5, 8.5, 9.5]
export default function ma(arr, n){
  return arr.map((item, index, ar)=> {
    var sliceFront = index - n + 1;
    var divisor = n;

    if (sliceFront < 0) {
      sliceFront = 0;
      divisor = index + 1;
    }

    var sum = ar.slice(sliceFront, index + 1)
      .reduce((p, c)=> {
        if (c === null) {
          divisor--;
        }

        return p + c;
      }, 0);

    if (divisor < 1) {
      return null;
    }

    return sum / divisor;
  });
}
