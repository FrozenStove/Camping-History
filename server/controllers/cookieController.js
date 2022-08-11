const cookieController = {};


cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  console.log('SSID cookie ready to send', res.locals.cookieId)
  res.cookie('ssid', res.locals.cookieId, {httpOnly: true});
  return next();

//   {httpOnly: true}
}

module.exports = cookieController;
