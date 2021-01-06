import {
    EXISTING_MARKERS_REQUEST,
    EXISTING_MARKERS_SUCCESS,
    EXISTING_MARKERS_FAILURE,
} from "./existingMarkersAction";

const initialState = {};

export function existingMarkersReducer(state = initialState, action) {
    switch (action.type) {
        case EXISTING_MARKERS_REQUEST:
          return {
            loading: true,
          };
        case EXISTING_MARKERS_SUCCESS:
          return {
            success: true,
            object: action.payload,
          };
        case EXISTING_MARKERS_FAILURE:
          return {
            err: action.payload,
          };
        default:
          return state;
      }
}