
// usege
// ma = require('./moving-average');
// ma([1,2,3,4,5,6,7,8,9,10], 3)

export default function(arr, n){
  return arr.map((item, index, ar)=> {
    // 自分の値から n 個前までの値の平均を返す
    var sliceFront = (index - n) > 0 ? (index -n ) : 0;
    var sum = ar.slice(sliceFront, index + 1).reduce((p, c)=> p + c);
    return sum / n;
  });
}
