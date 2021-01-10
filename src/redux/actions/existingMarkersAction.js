import axios from "axios";

export const EXISTING_MARKERS_REQUEST = "EXISTING_MARKERS_REQUEST";
export const EXISTING_MARKERS_SUCCESS = "EXISTING_MARKERS_SUCCESS";
export const EXISTING_MARKERS_FAILURE = "EXISTING_MARKERS_FAILURE";

const existingMarkers = roomcode => async dispatch => {
    dispatch({ type: EXISTING_MARKERS_REQUEST, payload: { roomcode }});
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/existingMarkers/${roomcode}`);
        dispatch({ type: EXISTING_MARKERS_SUCCESS, payload: data});
    } catch(err) {
        dispatch({ type: EXISTING_MARKERS_FAILURE, payload: err});
    }
};

export { existingMarkers };