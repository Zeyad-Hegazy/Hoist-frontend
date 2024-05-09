import { CREATE, GET, UPDATE, DELETE } from "../../constants/crud";

export default (state = [], action) => {
      switch (action.type) {
            case CREATE + "_clients":
                  return [...state, action.payload];
            case GET + "_clients":
                  return [...action.payload];
            case UPDATE + "_clients":
                  return state.map((standard) => {
                        if (standard.id === action.payload.id) {
                              return action.payload;
                        }
                        return standard;
                  });
            case DELETE + "_clients":
                  return state.filter((standard) => standard.id !== action.payload.id);
            default:
                  return state;
      }
};
