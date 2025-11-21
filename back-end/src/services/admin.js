const { Admin } = require('../models/admin');

const getAdminInfo = (email) => {
    return Admin.findOne({ email });
}

module.exports = { getAdminInfo };      