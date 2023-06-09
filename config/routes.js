const homeController = require("../controllers/homeController");
const catalogController = require("../controllers/catalogController");
const createController = require("../controllers/createController");
const errorController = require("../controllers/errorController");
const facilityController = require("../controllers/facilityController");
const authController = require("../controllers/authController");
const { hasUser } = require("../middlewares/guards");
const roomController = require("../controllers/roomController");

function app(app) {
  app.use(homeController);
  app.use("/catalog", catalogController);
  app.use("/create", hasUser(), createController);
  app.use("/facility", facilityController);
  app.use('/auth', authController);
  app.use('/room', roomController);

  app.all("*", errorController);
}

module.exports = app;