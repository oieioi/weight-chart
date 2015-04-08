import {Line} from 'react-chartjs';
import React from 'react';

export default React.createClass({

  getInitialState(){
    return {
      data: {
        labels: ['item:1', 'item:2', 'item:3'],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [1, 2, 3]
          }
        ]
      }
    };
  },

  count: 4,

  componentDidMount() {
    setInterval(() => {
      var newItem = this.state.data.datasets.slice();
      var labels = this.state.data.labels.slice();
      var rand = Math.floor(Math.random() * 20);
      labels.push('item:' + this.count++);
      newItem[0].data.push(rand);

      this.setState({
        data:{
          labels: labels,
          datasets: newItem
        }
      });
    }, 2000);

  },

  render() {

    var options = {
      animation: false
    };

    return (
      <Line
        data={this.state.data}
        options={options}
        width="400"
        height="400"
        redraw
      />
    );
  }
});

