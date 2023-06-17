const { constants } = require("../constants");

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        titel: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      case constants.FORBIDDEN:
        res.json({
          titel: "Forbidden",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
        case constants.NOT_FOUND:
          res.json({
            titel: "Not Found",
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    default:
      console.log("No errors, all good :) ");
      break;
  }
};