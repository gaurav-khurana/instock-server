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
  getAllWarehouses,
  createWarehouse,
};
