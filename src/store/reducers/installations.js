/* eslint-disable no-case-declarations */
import { CREATE, GET, UPDATE, DELETE } from "../../constants/crud";

export default (state = [], action) => {
      switch (action.type) {
            case CREATE + "_installation":
                  return [...state, action.payload];
            case GET + "_installation":
                  return [...action.payload];
            case UPDATE + "_installation":
                  return state.map((employee) => {
                        if (employee.id === action.payload.id) {
                              return action.payload;
                        }
                        return employee;
                  });
            case DELETE + "_installation":
                  return state.filter((employee) => employee.id !== action.payload.id);
            default:
                  return state;
      }
};
