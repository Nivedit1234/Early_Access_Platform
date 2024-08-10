//
//const notFound = (req, res, next) => {
//this will be called if not other middleware has handled the request
//it will create a new error object and set the code to 404

//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

const errorHandler = (err, req, res, next) => {
  //to overwrite default express error handler
  //To change express default error handler from sending HTML Page

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message; //so if you write throw new Error("xyx messafe ") this inside message will be accesibe through err.message variable message.

  //Check for mongoose bad ObjectId --> when invalid product id is given in url

  // if (err.name === 'CastError' && err.kind === 'ObjectId') {
  //   message: 'Resource not found';                     -------->this code is not needed anymore checkObjectId will do the job
  //   statusCode: 404;
  // }
  // However if we have a invalid **ObjectId** as `req.params.id` and use that to
  // query our products in the database, Mongoose will throw an error before we
  // reach the line of code where we throw our own error.

  //     In section **3 - Custom Error Middleware** we throw an error from our
  // `getProductById` controller function, with a _custom_ message.
  // However if we have a invalid **ObjectId** as `req.params.id` and use that to
  // query our products in the database, Mongoose will throw an error before we
  // reach the line of code where we throw our own error.

  res.status(statusCode).json({
    message,
    // stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
