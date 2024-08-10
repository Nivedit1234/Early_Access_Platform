const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

//this asyncHandler avoid overheads of try-catch block when dealing with promises
