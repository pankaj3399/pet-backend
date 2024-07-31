import { User } from "./models/user.model.js";

export const seedAdmin = async () => {
    console.log("🌱 Seeding Admin...");
    const adminExist = await User.findOne({ role: "admin" });
    console.log("admin Exist: " + adminExist);
    if (!adminExist) {
        const adminData = {
            fullName: process.env.PRE_DEFINED_ADMIN_FULLNAME,
            email: process.env.PRE_DEFINED_ADMIN_EMAIL,
            username: process.env.PRE_DEFINED_ADMIN_USERNAME,
            password: process.env.PRE_DEFINED_ADMIN_PASSWORD,
            role: "admin"
        }
        console.log(adminData);
        await User.create(adminData);

        console.log("🌱 Admin seeded successfully.");
    } else {
        console.log("Admin already exists.");
    }
};