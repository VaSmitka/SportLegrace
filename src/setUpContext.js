import React, { Component }  from 'react';

const SetUpContext = React.createContext();


export class SetUpProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workTime: '',
      exerciseTime: '',
      workSchedule: ''
    };
  }

  getWorkTime = () => {
    if (this.state.workTime) {
      return this.state.workTime;
    } else {
      return localStorage.getItem('workTime');
    }
  };

  getExerciseTime = () => {
    if (this.state.exerciseTime) {
      return this.state.exerciseTime;
    } else {
      return localStorage.getItem('exerciseTime');
    }
  };

  getWorkSchedule = () => {
    if (this.state.workSchedule) {
      return this.state.workSchedule;
    } else {
      return JSON.parse(localStorage.getItem('workSchedule'));
    }
  };

  setWorkTime = (workTime) => {
    this.setState({workTime: workTime});
    localStorage.setItem('workTime', workTime);
  };

  setExerciseTime = (exerciseTime) => {
    this.setState({exerciseTime: exerciseTime});
    localStorage.setItem('exerciseTime', exerciseTime);
  };

  setWorkSchedule = (workSchedule) => {
    this.setState({workSchedule: workSchedule});
    localStorage.setItem('workSchedule', JSON.stringify(workSchedule));
  };

  render() {
    const { children } = this.props;

    return (
      <SetUpContext.Provider
        value={{
          getWorkTime: this.getWorkTime,
          getExerciseTime: this.getExerciseTime,
          getWorkSchedule: this.getWorkSchedule,
          setWorkTime: this.setWorkTime,
          setExerciseTime: this.setExerciseTime,
          setWorkSchedule: this.setWorkSchedule
        }}
      >
        {children}
      </SetUpContext.Provider>
    );
  }
}

export default SetUpContext;