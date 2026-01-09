const router = require("express").Router();
const Admin = require("../Models/Admin");

router.post("/add", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    console.log(existingAdmin);

    if (existingAdmin) {
      return res.status(400).json({ error: "User is already registered" });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save(); // ✅ FIXED HERE

    res.status(201).json({
      message: "User is registered successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.log("Registration Error", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

router.get("/list", async (req, res) => {
  try {
    const data = await Admin.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch error: ", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await Admin.findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "User is not registred" });
    }

    if (String(result.password) !== String(password)) {
      return res.status(400).json({ message: "Password do not match" });
    }

    return res
      .status(200)
      .json({ message: "Login success", user: { name: result.email } });
  } catch (error) {
    console.error("Loggin error : ", err);
    res.status(500).json({ error: "Server errror during login" });
  }
});

module.exports = router;
