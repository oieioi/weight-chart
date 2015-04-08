import {Line} from 'react-chartjs';
import React from 'react';

export default React.createClass({

  getInitialState(){
    return {
      value: '',
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

    if(!data || !date){
      void 0;
      // return;
    }

    var labels = this.state.data.labels;
    labels.push(date);

    var newItem = this.state.data.datasets;
    newItem[0].data.push(+data || null);
    console.log(newItem[0].data);

    this.setState({
      data:{
        labels: labels,
        datasets: newItem
      }
    });

  },

  handleChange(event){
    this.setState({
      value: event.target.value
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
      animation: false
    };

    var value = this.state.value;

    return (
      <div>
        <Line
          data={this.state.data}
          options={options}
          width="800"
          height="400"
          redraw
        />
        <textarea value={value} onChange={this.handleChange} />
        <button onClick={this.pushItem}>push</button>
        <button onClick={this.resetData}>reset</button>
      </div>
    );
  }
});

