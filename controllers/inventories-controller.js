const knex = require("knex")(require("../knexfile"));

// func to Get Single Inventory Item by Id

const getSingleInventory = async (req, res) => {
  const response = await knex("inventories").where({ id: req.params.id });
  console.log(response);
};

module.exports = {
  getSingleInventory,
};
