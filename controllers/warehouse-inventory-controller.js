const knex = require("knex")(require("../knexfile"));
// const inventories_controller = require("../controllers/inventories-controller");
// const warehouse_controller = require("../controllers/warehouse-controller");

const getAllInventorySingleWarehouse = async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const getWarehouse = await knex("warehouses").where({ id: warehouseId });

    console.log(getWarehouse);

    console.log("i m here");

    if (getWarehouse.length === 0) {
      return res.status(404).json({
        message: `bruh warehouse ${req.params.id} not found`,
      });
    }

    const getInventories = await knex("inventories")
      .where({ warehouse_id: warehouseId })
      .select("id", "item_name", "category", "status", "quantity");
    res.status(200).json(getInventories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error fetching inventories` });
  }
};

module.exports = {
  getAllInventorySingleWarehouse,
};
