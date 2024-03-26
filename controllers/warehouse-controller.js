const knex = require("knex")(require("../knexfile"));

const getAllWarehouses = async (req, res) => {};

const createWarehouse = async (req, res) => {
  if (
    !req.body.warehouse ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    res.status(400).json();
  }

  try {
  } catch {}
};

module.exports = {
  createWarehouse,
};
