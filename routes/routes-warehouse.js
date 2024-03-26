const router = require("express").Router();
const { Router } = require("express");
const warehouse_controller = require("../controllers/warehouse-controller");

router.route("/warehouses").post(warehouse_controller.addWarehouse);

module.exports = router;
