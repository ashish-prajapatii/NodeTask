const router = require("express").Router();
const middleware = require("../helper/middleware");
const users = require("../controller/user.controller");

router.post("/insertData", users.insertData);
router.get("/getAllData", users.getAllData);
router.post("/updateData", users.updateData);
router.delete("/deleteData", users.deleteData);
router.put("/getSingleData", users.getSingleData);
router.post("/checkUser", users.checkUser);
router.get("/login", users.login);

module.exports = router;