const { all } = require("../routes/routes-inventories");

const knex = require("knex")(require("../knexfile"));

// func to Get Single Inventory Item by Id

const getSingleInventory = async (req, res) => {
  try {
    const response = await knex("inventories").where({ id: req.params.id });
    console.log(response);

    if (response.length === 0) {
      res.status(404).json({
        message: `No inventory of id ${req.params.id} exists. Invalid id`,
      });
    }
    const foundInventory = response[0];
    res.status(200).json({ foundInventory });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Can't get individual inventory ${error}` });
  }
};

// getAllinventories in BackEnd
const getAllInventories = async (req, res) => {
  try {
    const allInventories = await knex("inventories").select(
      "id",
      "warehouse_id",
      "item_name",
      "description",
      "category",
      "status",
      "quantity"
    );

    if (allInventories.length === 0) {
      return res.status(404).json({
        message: `No inventories found.`,
      });
    }

    const infoToSend = [];
    for (const inventory of allInventories) {
      const warehouse = await knex("warehouses").where({ id: inventory.warehouse_id }).select("warehouse_name");

      const inventoryData = {
        id: inventory.id,
        warehouse_name: warehouse.length > 0 ? warehouse[0].warehouse_name : null,
        item_name: inventory.item_name,
        description: inventory.description,
        category: inventory.category,
        status: inventory.status,
        quantity: inventory.quantity,
      };

      infoToSend.push(inventoryData);
    }

    res.status(200).json(infoToSend);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "cant get All Inventories" });
  }
};


module.exports = {
  getSingleInventory,
  getAllInventories
};
