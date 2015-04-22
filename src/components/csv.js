// parseCsv('f1,2\nf2,3\nf3,4\n', ['name', 'value'])
// => [{"name":"f1", "value":"2"}, {"name":"f2", "value":"3"}, {"name":"f3", "value":"4"} ]
export default function parseCsv(str, header){
  var lines = str.split('\n');
  return lines.map((ln) => {
    var items = ln.split(',');
    var ob = {};
    header.forEach((it, count)=>ob[it] = items[count]);
    return ob;
  });
}
