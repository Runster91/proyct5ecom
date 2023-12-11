const BikeReducer = (globalState, action) => {
    switch (action.type) {
      case "GET_BIKES":
        return {
          ...globalState,
          bikes: action.payload,
        }
  
      case "GET_PIZZA":
        return {
          ...globalState,
          bike: {
            ...globalState.bikes,
            ...action.payload,
          },
        }
  
      default:
        return globalState
    }
  }
  
  export default BikeReducer
  