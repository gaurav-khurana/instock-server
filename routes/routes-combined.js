const router = require("express").Router();
require("dotenv").config();
const warehouse_inventories_controller = require("../controllers/warehouse-inventory-controller");

router.route("/warehouses/:id/inventories")
    .get(warehouse_inventories_controller.getAllInventorySingleWarehouse)

module.exports = router;