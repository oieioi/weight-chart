import {Line} from 'react-chartjs';
import React from 'react/addons';
import ma from './moving-average';
import sa from 'superagent';

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState(){
    return {
      value: [
        'f1,2',
        'f2,',
        'f3,4',
        'f3,',
        'f4,20',
        'f5,',
        'f6,',
        'f7,2',
        'f8,8',
        'f9,7',
        'f11,9',
        'f12,7',
        'f13,',
        'f14,4',
        'f15,'
      ].join('\n'),
      width: 1200,
      height: 500,
      per: 7,
      hash: '',
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
          },
          {
            label: "moving average",
            fillColor: "rgba(20,220,220,0.2)",
            strokeColor: "rgba(20,220,220,1)",
            pointColor: "rgba(20,220,220,1)",
            pointStrokeColor: "#f0f",
            pointHighlightFill: "#f0f",
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
    newItem[1].data = [];
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

  setAverage(){
    var newItem = this.state.data.datasets;
    var aves = ma(newItem[0].data, this.state.per);
    newItem[1].data = aves;

    this.setState({
      data:{
        labels: this.state.data.labels,
        datasets: newItem
      }
    });
  },

  createData() {
    sa.post('/api/bulk')
    .send(this.state.value)
    .end((err, res)=>{
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });

  },

  updateData(){
    sa.put('/api/bulk/' + this.state.hash)
    .send(this.state.value)
    .end((err, res)=>{
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });

  },

  fetchData() {
    sa.get('/api/bulk/' + this.state.hash)
    .end((err, res)=>{
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });

  },

  render(){
    var options = {
      animation: false,
      pointDot: true
    };

    return (
      <div>
        <div>
          <label>width: <input type="text" valueLink={this.linkState('width')} /></label>
          <label>height: <input type="text" valueLink={this.linkState('height')} /></label>
        </div>
        <div>
          <Line
            data={this.state.data}
            options={options}
            width={this.state.width}
            height={this.state.height}
            redraw
          />
        </div>
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
          <div>
            <label>per: <input type="text" valueLink={this.linkState('per')} /></label>
            <button onClick={this.setAverage}>average</button>
          </div>
          <div>
            <label>hash: <input type="text" valueLink={this.linkState('hash')} /></label>
            <button onClick={this.updateData}>update</button>
            <button onClick={this.fetchData}>fetch</button>
          </div>
          <div>
            <button onClick={this.createData}>create</button>
          </div>
        </div>
    </div>
    );
  }
});

