import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER } from "../constant";
import { bake_cookie, read_cookie } from "sfcookies";

const reminder = action => {
  const { text, dueDate } = action;
  return {
    id: Math.random(),
    text,
    dueDate
  };
};

const delReminder = (state, id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
};

const remainders = (state = [], action) => {
  let reminders = null;
  state = read_cookie("reminders");
  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      bake_cookie("reminders", reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = delReminder(state, action.id);
      bake_cookie("reminders", reminders);
      return reminders;
    case CLEAR_REMINDER:
      reminders = [];
      bake_cookie("reminders", reminders);
      return reminders;
    default:
      return state;
  }
};

export default remainders;
