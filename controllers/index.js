const router = require("express").Router();
const apiRoutes = require("./api");
const mainRoutes = require("./main-routes");
//const dashRoutes = require("./dashboard-routes");
router.use("/api", apiRoutes);
router.use("/", mainRoutes);
//router.use("/dashboard", dashRoutes);
router.use((req, res) => {
  res.status(404).end();
});
module.exports = router;
