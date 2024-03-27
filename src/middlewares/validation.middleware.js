const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body,{abortEarly:false});
  if (error) {
    // Without label
    // const errors = error.details.map((detail) => detail.message);
    // return res.status(400).json({ errors });
    const errors = error.details.map((detail) => ({
      field: detail.context.label,
      message: detail.message.replace(/"/g, ''),
    }));
    return res.status(400).json({ errors });
  }
  next();
};

module.exports=validateRequest;