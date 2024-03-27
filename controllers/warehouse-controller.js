const knex = require("knex")(require("../knexfile"));

// Get method to get all warehouses

const getAllWarehouses = async (req, res) => {
  try {
    const getWarehouse = await knex("warehouses").select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    );
    res.json(getWarehouse);
    res.status("200");
  } catch {
    res.status("400").json({ message: "bruh no data." });
  }
};

// post method to Create New Warehouse

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

  //
  try {
    const response = await knex("warehouses").insert(req.body);
    console.log(response);

    res.status(201).json({
      message: `New warehouse added ${req.body.warehouse_name} ${req.body}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `adding warehouse process FAILED ${error}` });
  }
};

// Delete method to Delete a Warehouse

const deleteWarehouse = async (req, res) => {
  try {
    const rowDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .del();

    if (rowDeleted === 0) {
      res.status(404).json({ message: `${req.params.id} WAREHOUSE NOT FOUND` });
    }

    res.status(204).json({ message: `WAREHOUSE DELETED` });
  } catch (error) {
    res.status(500).json({ message: `Unable to delete ${error}` });
  }
};

module.exports = {
  getAllWarehouses,
  addWarehouse,
  deleteWarehouse,
};
