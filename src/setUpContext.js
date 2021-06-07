import React, { Component }  from 'react';

const SetUpContext = React.createContext();


export class SetUpProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workTime: '',
      workSchedule: ''
    };
  }

  setWorkTime = (workTime) => {
    this.setState({workTime: workTime});
  };

  setWorkSchedule = (workSchedule) => {
    this.setState({workSchedule: workSchedule});
  };

  render() {
    const { children } = this.props;

    return (
      <SetUpContext.Provider
        value={{
          setWorkTime: this.setWorkTime,
          setWorkSchedule: this.setWorkSchedule
        }}
      >
        {children}
      </SetUpContext.Provider>
    );
  }
}

export default SetUpContext;