const knex = require("knex")(require("../knexfile"));

const getAllWarehouses = async (req, res) => {
  try {
    const getWarehouse = await knex('warehouses')
      .select(
        'id', 
        'warehouse_name', 
        'address', 
        'city', 
        'country', 
        'contact_name', 
        'contact_position', 
        'contact_phone', 
        'contact_email'
      )
    res.json(getWarehouse);
    res.status('200')
  } catch {
    res.status('400').json({message: "bruh no data."})
  }
};

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

  // phone number validation
  //   if (req.body.contact_phone.length !== 10) {
  //     res.status(400).json({ message: `Invalid phone number` });
  //   }

  try {
    const response = await knex("warehouses").insert(req.body);
    const newWarehouse = response[0];

    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouse.id,
    });
    res.status(201).json({
      message: `New warehouse added ${newWarehouse.id} ${newWarehouse.warehouse_name} ${createdWarehouse}`,
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
