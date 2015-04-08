
// usege
// ma = require('./moving-average');
// ma([1,2,3,4,5,6,7,8,9,10], 3)

export default function ma(arr, n){
  return arr.map((item, index, ar)=> {
    var sliceFront = index - n + 1;
    var divisor = n;

    if (sliceFront < 0) {
      sliceFront = 0;
      divisor = index + 1;
    }

    var sum = ar.slice(sliceFront, index + 1).reduce((p, c)=> p + c);
    console.log(index, 'ar', sliceFront, '-', index + 1, ',sum:', sum, ', divisor:', divisor, 'average:', sum / divisor);
    return sum / divisor;
  });
}

//console.log(ma([10, 12, 15, 20, 30, 20, 10, 12, 11], 4));
