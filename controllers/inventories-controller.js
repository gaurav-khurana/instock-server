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

  if (typeof (req.body.quantity) !== 'number') {
    res.status(400).json({ message: `The Quantity is NOT a Number`})
  }



  try {
    const updatedInventory = await knex("inventories").where({ id: req.params.id }).update(req.body);
console.log(updatedInventory);

    if (updatedInventory === 0) {
      return res.status(404).json({ message: `Inventory with ID ${req.params.id} not found`});
    }

    // const updatedDataWarehouse = updatedWarehouse[0];
    res.status(200).json({message: `${req.body.item_name} details updated.`});
  } catch(error) {
    res.status(500).json({message: `Error updating inventory ${error}`})
  }
}

module.exports = {
  getSingleInventory,
  putInventory,
};
