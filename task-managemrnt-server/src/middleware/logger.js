function customLogger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;

  console.log(`-- ${method} - ${url} - ${timestamp} ${ip}`);
  next();
}

module.exports= customLogger;
