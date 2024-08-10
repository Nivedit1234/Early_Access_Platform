import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  //cookie parser
  //this will allow us to access req.cookies
  //we will be able to acccess req.cookies.jwt
  //app.use(cookieParser());
  //==> add this in server.js for accessing cookies

  //set jwt as http only cookie on server
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
};

export default generateToken;
