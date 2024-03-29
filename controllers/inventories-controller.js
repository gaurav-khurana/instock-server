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
      return;
    }

    const foundInventory = response[0];
    res.status(200).json({ foundInventory });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Can't get individual inventory ${error}` });
  }
};

// PUT/EDIT some Inventory

const putInventory = async (req, res) => {
  // check if data is available!
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    res.status(400).send(`Can't edit Inventory. Missing details!`);
  }

  // if (warehouse_id == undefined) {
  //   res.status(400).json({ message: `Warehouse ID does not exist in the warehouses table`})
  // }

  // if (inventories.quantity !== 'number' ) {
  //   res.status(400).json({ message: `The Quantity is NOT a Number`})
  // }

  if (typeof req.body.quantity !== "number") {
    res.status(400).json({ message: `The Quantity is NOT a Number` });
  }

  try {
    const updatedInventory = await knex("inventories")
      .where({ id: req.params.id })
      .update(req.body);
    console.log(updatedInventory);

    if (updatedInventory === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }

    // const updatedDataWarehouse = updatedWarehouse[0];
    res.status(200).json({ message: `${req.body.item_name} details updated.` });
  } catch (error) {
    res.status(500).json({ message: `Error updating inventory ${error}` });
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
      const warehouse = await knex("warehouses")
        .where({ id: inventory.warehouse_id })
        .select("warehouse_name");

      const inventoryData = {
        id: inventory.id,
        warehouse_name:
          warehouse.length > 0 ? warehouse[0].warehouse_name : null,
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

// check if id is in warehouses database
async function isIdAvailable(id) {
  const checkId = await knex("warehouses").where({ id: id });
  return checkId; // if not exist (true)
}

// POST/CREATE a new inventory item
const addInventory = async (req, res) => {
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    res.status(400).json({ message: `Unsuccessful! Missing Details!` });
  }

  // Check if warehouse id exist
  const idExist = await isIdAvailable(req.body.warehouse_id);
  if (idExist === false) {
    res
      .status(400)
      .json({ message: `Warehouse ${req.body.warehouse_id} don't exist` });
  }

  // Check if quanity is a number
  if (!req.body.quantity) {
    // figure out how to check if its number or not making sure that the its still string
    res.status(400).json({ message: `Quantity must be a number` });
  }

  try {
    const inventoryData = await knex("inventories").insert(req.body);
    res.status(201).json(inventoryData);
  } catch (error) {
    res.status(500).json({ message: `Adding inventory item FAILED ${error}` });
  }
};

//delete a single inventory
const deleteInventory = async (req, res) => {
  try {
    const rowDeleted = await knex("inventories")
      .where({ id: req.params.id })
      .del();

    if (rowDeleted === 0) {
      res
        .status(404)
        .json({ message: `${req.params.id} Inventory was not found` });
    }

    return res.status(204).json({ message: `Inventory is deleted` });
  } catch (error) {
    res.status(500).json({ message: `Unable to delete ${error}` });
  }
};

module.exports = {
  getSingleInventory,
  getAllInventories,
  putInventory,
  deleteInventory,
  addInventory,
};
