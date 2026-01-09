const Admin = require("../Models/Admin");

const createDefaultAdmin = async () => {
    try {
        const email = "admin@gmail.com";

        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin) {
            const admin = new Admin({
                email: "admin@gmail.com",
                password: "admin@123",
                isSuperAdmin: true,
            });

            await admin.save();
            console.log("✅ Default admin created.");
        } else {
            console.log("ℹ️ Admin already exists.");
        }
    } catch (error) {
        console.error("❌ Failed to create admin:", error.message);
    }
};

module.exports = createDefaultAdmin;
