const knex = require("knex")(require("../knexfile"));

const getAllWarehouses = async (req, res) => {};

const addWarehouse = async (req, res) => {
  // check for missing details
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    res.status(400).send("Can't add Warehouse. Missing details");
  }

  // phone number & email validation
  if (!req.body.contact_phone || !req.body.contact_email) {
    res.status(400).json({ message: `Missing Phone number or Email address` });
  }

  try {
    const response = await knex("warehouses").insert(req.body);
    console.log(response);
    // const newWarehouse = response[0];

    // const createdWarehouse = await knex("warehouses").where({
    //   id: newWarehouse.id,
    // });
    res.status(201).json({
      message: `New warehouse added ${req.body.warehouse_name} ${req.body}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `adding warehouse process FAILED ${error}` });
  }
};

module.exports = {
  addWarehouse,
};
