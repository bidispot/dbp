import { AppError } from './model';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  const { errorMessage } = action;

  if (errorMessage) {
    return new AppError({
      message: errorMessage
    })
  }

  return state
}
