
function UnexpectedRouteHandler(req,res,next){
  let route = req.url;
  res.status(404);
  res.send(`${route} NOT Found`);
  // next()
}

module.exports = UnexpectedRouteHandler;