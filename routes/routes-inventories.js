const router = require("express").Router();
require("dotenv").config();
const inventories_controller = require("../controllers/inventories-controller");

// route for inventories
router.route("/inventories/").get(inventories_controller.getAllInventories);
// route for Get Single Inventory Item
router.route("/inventories/:id").get(inventories_controller.getSingleInventory);

module.exports = router;
