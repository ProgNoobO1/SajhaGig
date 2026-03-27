function validate(fields) {
  return (req, res, next) => {
    const errors = [];
    for (const field of fields) {
      const value = req.body[field];
      if (value === undefined || value === null || value === '') {
        errors.push(`${field} is required`);
      }
    }
    if (errors.length) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }
    next();
  };
}

module.exports = validate;
