exports.errorHandler = (err, res) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ err: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ err: "Invalid Token" });
  }

  if (err.name === "ValidationError") {
    //validation error
    return res.status(401).json({ err: "Validation Error" });
  }
  // default to 500 server error
  return res.status(500).json({ err: err.message });
};

exports.recordExists = (data, res) => {
  // send existing record
  return res.status(409).json(data);
};

exports.duplicateError = (err, res)=>{
  // duplicate error
  return res.status(409).json({ err: err });
}
