const router = require("express").Router();
const { Router } = require("express");
const warehouse_controller = require("../controllers/warehouse-controller");

// route to get all warehouses, add new warehouse
router
  .route("/warehouses")
  .get(warehouse_controller.getAllWarehouses)
  .post(warehouse_controller.addWarehouse);

// route to get single warehouse
router
  .route("/warehouses/:id")
  .get(warehouse_controller.getOneWarehouse)
  .put(warehouse_controller.putWarehouse);

// route to delete warehouse
router.route("/warehouses/:id").delete(warehouse_controller.deleteWarehouse);

module.exports = router;
