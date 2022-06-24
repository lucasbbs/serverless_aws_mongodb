const errorFormatter = (err) => {
  const errors = {};
  const allErrors = err
    .substring(err.indexOf(':') + 1)
    .trim()
    .split(',')
    .map((e) => e.trim());

  allErrors.forEach((error) => {
    const [key, value] = error.split(':').map((e) => e.trim());
    errors[key] = value;
  });

  return errors;
};

module.exports = { errorFormatter };
