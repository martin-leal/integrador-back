const httpStatus = require("http-status-codes");

const respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.send(`${errorCode} | La pagina no existe`);
};

const respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(`Ocurrio un error ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Disculpe, la aplicacion tiene un problema`);
};

module.exports = {
  respondInternalError,
  respondNoResourceFound,
};
