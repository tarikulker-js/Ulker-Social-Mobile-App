const initialState = [];

export const pageNameReducer = (state = initialState, action) => {
    if(action.type == "setPageName"){
        return action.payload;
    }
    
    return state;
}