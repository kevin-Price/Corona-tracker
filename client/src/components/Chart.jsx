import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';
import { connect } from 'react-redux';

const format = () => tick => tick;

const chartStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});

const ValueLabel = props => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}`} />;
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

class TemperatureChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      temperatures: [],
    };
  }

  render() {
    const { temperatures: chartData } = this.state;
    const { classes, observations } = this.props;

    const map = new Map();
    observations.map(observation => {
      const date = new Date(observation.date).toISOString().slice(0, 10);
      let temp;
      if (
        !observation.physical.feverSeverity ||
        observation.physical.feverSeverity === '' ||
        !parseInt(observation.physical.feverSeverity, 10) > 0
      ) {
        temp = 0;
      } else {
        temp = parseInt(observation.physical.feverSeverity, 10);
      }

      if (map.has(date)) {
        if (map.get(date).temp !== 0) {
          map.get(date).temp = (map.get(date).temp + temp) / (map.get(date).numObservations + 1);
        }
        map.set(temp, {
          temp,
          date,
        });
      } else {
        map.set(date, {
          temp,
          date,
        });
      }
      return true;
    });

    map.forEach(entry => {
      const tempRecord = { date: entry.date, temperature: entry.temp };
      chartData.push(tempRecord);
    });

    console.log(chartData);

    return (
      <Paper>
        <Chart data={chartData} className={classes.chart}>
          <ArgumentAxis tickFormat={format} />
          <ValueAxis max={50} labelComponent={ValueLabel} />
          <LineSeries name="Temperature" valueField="temperature" argumentField="date" />
          <Title text="Patient temperature" textComponent={TitleText} />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    observations: state.observationsReducer.observations,
  };
};

export default connect(mapStateToProps)(withStyles(chartStyles, { name: 'TemperatureChart' })(TemperatureChart));
