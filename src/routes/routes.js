const messageRoute =  require("./messageRoute");

module.exports = (app) =>{
  app.use(messageRoute.path, messageRoute.router);
};