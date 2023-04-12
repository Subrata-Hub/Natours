// module.exports = (fn) => (req, res, next) => {
//   fn(req, res, next).catch(next);
// };

// eslint-disable-next-line arrow-body-style
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
