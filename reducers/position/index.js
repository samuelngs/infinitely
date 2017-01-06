
const defaults = {
  x: 0,
  y: 0,
};

export default (state = defaults, action) => {
  switch ( action.type ) {
    case 'WEAVE_POSITION_CHANGED':
      return { x: action.x, y: action.y };
    default:
      return state;
  }
}
