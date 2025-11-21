const bcrypt = require("bcryptjs");
const { User } = require("./model/user");
require("dotenv").config();

const createAdminUser = async () => {
    const isExist = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (isExist) {
        console.log("Admin user already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
        name: "admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin"
    });
    await adminUser.save();
    console.log("Admin user created successfully");
}

module.exports = createAdminUser;