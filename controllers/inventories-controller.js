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

module.exports = {
  getSingleInventory,
};
