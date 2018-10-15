import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import { addReminder, deleteReminder, clearReminder } from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: ""
    };
  }
  onInputChangeHandler = event => {
    this.setState({
      text: event.target.value
    });
  };

  onClickAddReminder = () => {
    //this.props.addRemainderHandler(this.state.text);
    this.props.addReminder(this.state.text, this.state.dueDate);
  };

  onClickDeleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminder() {
    const reminders = this.props.reminders;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map(reminder => {
          return (
            <li className="list-group-item" key={reminder.id}>
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                </div>
              </div>
              <div
                onClick={() => this.onClickDeleteReminder(reminder.id)}
                className="list-item delete-button"
              >
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  showReminder() {
    const reminders = this.props.reminders;
    return reminders.length ? (
      <div
        className="btn btn-danger clear-reminder"
        onClick={() => this.props.clearReminder()}
      >
        Clear Remainder
      </div>
    ) : (
      ""
    );
  }

  render() {
    return (
      <div className="app">
        <div className="title">Remainder Pro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="I have to ..."
              onChange={event => this.setState({ text: event.target.value })}
            />
            <input
              type="datetime-local"
              className="form-control"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.onClickAddReminder}
          >
            Add Remainder
          </button>
        </div>

        {this.renderReminder()}
        {this.showReminder()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

function mapDispatcherToProps(dispatch) {
  return bindActionCreators(
    { addReminder, deleteReminder, clearReminder },
    dispatch
  );
  // return {
  //   addRemainderHandler: data => dispatch(addRemainder(data))
  // };
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(App);
