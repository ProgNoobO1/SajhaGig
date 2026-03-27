function errorHandler(err, req, res, _next) {
  console.error(err);

  if (err.status) {
    return res.status(err.status).json({ success: false, message: err.message });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ success: false, message: 'Duplicate entry' });
  }

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
}

module.exports = errorHandler;
