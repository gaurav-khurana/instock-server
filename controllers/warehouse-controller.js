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

    res.status(200).json(getWarehouse);
  } catch {
    res.status(400).json({ message: "bruh no data." });
  }
};

// Get method to get a SINGLE warehouse

const getOneWarehouse = async (req, res) => {
  try {
    const getWarehouse = await knex("warehouses").where({ id: req.params.id });

    if (getWarehouse.length === 0) {
      return res.status(404).json({
        message: `bruh warehouse ${req.params.id} not found`,
      });
    }

    const warehouseData = getWarehouse[0];
    res.status(200).json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `bruh we cant get warehouse with id ${req.params.id}`,
    });
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

    return res.status(204).json({ message: `WAREHOUSE DELETED` });
  } catch (error) {
    res.status(500).json({ message: `Unable to delete ${error}` });
  }
};

// PUT/EDIT a Warehouse

const putWarehouse = async (req, res) => {
  // check if data is available!
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
    res.status(400).send("Can't edit Warehouse. Missing details!");
  }

  // phone number & email validation
  if (!req.body.contact_phone || !req.body.contact_email) {
    res.status(400).json({ message: `Missing Phone number or Email address` });
  }

  try {
    const updatedWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (updatedWarehouse === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }

    // const updatedDataWarehouse = updatedWarehouse[0];
    res
      .status(200)
      .json({ message: `${req.body.warehouse_name} details updated.` });
  } catch (error) {
    res.status(500).json({ message: `Error updating warehouse ${error}` });
  }
};

module.exports = {
  getAllWarehouses,
  getOneWarehouse,
  putWarehouse,
  addWarehouse,
  deleteWarehouse,
};
