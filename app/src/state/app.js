const initialState = {
  isLender: false,
};

const TOGGLE_LENDER = 'TOGGLE_LENDER';

export const toggleLender = isLender => ({
  type: TOGGLE_LENDER,
  isLender,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LENDER:
      return { ...state, isLender: action.isLender };
    default:
      return state;
  }
};
