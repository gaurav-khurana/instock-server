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

// check if id is in warehouses database
async function isIdAvailable(id) {
    const checkId = await knex("warehouses").where({id: id});
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
        res.status(400).json({message: `Unsuccessful! Missing Details!`});
    }
    
    // Check if warehouse id exist
    const idExist = await isIdAvailable(req.body.warehouse_id);
    if (idExist) {
        res.status(400).json({message: `Warehouse ${req.body.warehouse_id} don't exist`});
    }

    // Check if quanity is a number
    if (!req.body.quantity) { // figure out how to check if its number or not making sure that the its still string
        res.status(400).json({message: `Quantity must be a number`});
    }

    try {
        const inventoryData = await knex("inventories").insert(req.body);
        res.status(201).json(inventoryData);
    } catch(error) {
        res.status(500).json({message: `Adding inventory item FAILED ${error}`});
    }
}


module.exports = {
  getSingleInventory,
  addInventory,
};
