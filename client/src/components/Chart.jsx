import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';

class Chart extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      temperatures: [],
    };
  }
  render() {

    const { temperatures } = this.state;
    const { observations } = this.props;

    observations.forEach(observation => {
      const date = new Date(observation.date).toISOString().slice(0, 10);
      let temp; 
      if (
            !observation.physical.feverSeverity ||
            observation.physical.feverSeverity === '' ||
            !parseFloat(observation.physical.feverSeverity, 10) > 0
          ) {
            temp = 0;
          } else {
            temp = parseFloat(observation.physical.feverSeverity, 10);
          }

  
      var tempRecord = { date: date, temperature: temp };
      temperatures.push(tempRecord);
    });
    
    return (
      <ResponsiveContainer width='100%' aspect={4.0/1.5}>
      <LineChart
        data={temperatures}
        margin={{
          top: 10, right: 50, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[90, 110]}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Tooltip />
      </LineChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    observations: state.observationsReducer.observations,
  };
};

export default connect(mapStateToProps)(Chart);
