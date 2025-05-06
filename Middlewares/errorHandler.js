const errorHandler = (err, req, res, next) => {
  console.log("🔥Fired");

  let message = err.message || "Something went wrong";

  return res.status(500).json({
    msg: message,
  });
};

module.exports = errorHandler;
