import React from 'react';
import '../css/Table.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  margins: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  stickyHeader: {
    backgroundColor: 'rgba(255, 0, 0, 0.2);',
    color: 'rgba(255, 0, 0, 0.2);',
    fontSize: '16px',
  },
}));

const LogTable = props => {
  const { observations } = props;
  const questions = [
    'Date',
    'Overall Feeling',
    'Cough',
    'Fever',
    'Chills',
    'Shortness Of Breath',
    'Sore Throat',
    'Chest Pain',
    'Fatigue',
    'Bluishness',
    'Comments',
  ];
  const classes = useStyles();
  return (
    <div>
      <TableContainer
        classes={{
          root: classes.margins,
        }}
      >
        <Table stickyHeader>
          <TableHead
            classes={{
              root: classes.stickyHeader,
            }}
          >
            <TableRow>
              {questions.map(question => (
                <TableCell key={question}>{question}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {observations.map(observation => (
            <TableBody key={observation.date}>
              <TableRow>
                <TableCell>{new Date(observation.date).toLocaleDateString()}</TableCell>
                <TableCell>{observation.physical.dailyfeeling}</TableCell>
                <TableCell>{observation.physical.coughSeverity}</TableCell>
                <TableCell>{observation.physical.feverSeverity}</TableCell>
                <TableCell>{observation.physical.chillsSeverity}</TableCell>
                <TableCell>{observation.physical.shortnessOfBreathSeverity}</TableCell>
                <TableCell>{observation.physical.soreThroatSeverity}</TableCell>
                <TableCell>{observation.physical.chestPainSeverity}</TableCell>
                <TableCell>{observation.physical.fatigueSeverity}</TableCell>
                <TableCell>{observation.physical.bluishnessSeverity}</TableCell>
                <TableCell>{observation.nonPhysical.openComment}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
      <h2>Temperature Chart</h2>
      <Chart />
    </div>
  );
};

LogTable.propTypes = {
  observations: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => {
  return {
    observations: state.observationsReducer.observations,
  };
};

export default connect(mapStateToProps)(LogTable);
