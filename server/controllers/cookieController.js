const cookieController = {};


cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  res.cookie('ssid', res.locals.cookieId, {httpOnly: true});
  return next();
}

module.exports = cookieController;
