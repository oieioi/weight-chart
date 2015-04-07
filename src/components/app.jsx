import {Line} from 'react-chartjs';
import React from 'react';

export default React.createClass({

  getInitialState(){
    return {
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

  componentDidMount() {
    this.state.data.labels.push('hoge');
    this.state.data.datasets[0].data.push(2);
    this.state.data.labels.push('fuga');
    this.state.data.datasets[0].data.push(12);
    this.state.data.labels.push('bar');
    this.state.data.datasets[0].data.push(7);
  },

  render() {
    return (
      <Line data={this.state.data} width="400" height="400" redraw/>
    );
  }
});

