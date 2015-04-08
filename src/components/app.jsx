import {Line} from 'react-chartjs';
import React from 'react/addons';

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState(){
    return {
      value: `d1,2
d2,10
d3,
d4,11
d5,5`,
      width: 401,
      height: 300,
      data: {
        labels: [],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
          }
        ]
      }
    };
  },

  resetData() {
    var newItem = this.state.data.datasets.slice();
    newItem[0].data = [];
    this.setState({
      data:{
        labels: [],
        datasets: newItem
      }
    });
  },

  setData({data, date}) {

    var labels = this.state.data.labels;
    labels.push(date);

    var newItem = this.state.data.datasets;
    newItem[0].data.push(+data || null);

    this.setState({
      data:{
        labels: labels,
        datasets: newItem
      }
    });

  },

  parseCsv(str, header){
    var lines = str.split('\n');
    return lines.map((ln) => {
      var items = ln.split(',');
      var ob = {};
      header.forEach((it, count)=>ob[it] = items[count]);
      return ob;
    });
  },

  pushItem(){
    var datas = this.parseCsv(this.state.value, ['date', 'data']);
    datas.forEach((d)=>this.setData(d));
  },

  render(){
    var options = {
      animation: false,
      pointDot: false
    };

    return (
      <div>
        <div>
          <label>width: <input type="text" valueLink={this.linkState('width')} /></label>
          <label>height: <input type="text" valueLink={this.linkState('height')} /></label>
        </div>
        <Line
          data={this.state.data}
          options={options}
          width={this.state.width}
          height={this.state.height}
          redraw
        />
        <div>
        <label> csv:
          <textarea
            rows="5"
            cols="20"
            valueLink={this.linkState('value')}
            >
          </textarea>
        </label>
        <button onClick={this.pushItem}>push</button>
        <button onClick={this.resetData}>reset</button>
      </div>
    </div>
    );
  }
});

