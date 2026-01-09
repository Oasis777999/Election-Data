const router = require("express").Router();
const User = require("../Models/User");
const ExcelJS = require("exceljs");

router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      message: "User added successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding user",
      error: error.message,
    });
  }
});

router.post("/bulk_upload", async (req, res) => {
  try {
    const result = await User.insertMany(req.body);
    res.status(201).json({ message: "Data Inserted", count: result.length });
  } catch (error) {
    console.log("Got error , ", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// router.get("/list", async (req, res) => {
//   try {
//     const data = await User.find({});

//     res.status(200).json(data);
//   } catch (error) {
//     console.log("Erro in fetch", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

router.get("/list", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search ? req.query.search.trim() : "";

    const query = {};

    if (search) {
      const searchIsNumber = /^\d+$/.test(search);
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
      if (searchIsNumber) {
        query.$or.push(
          { phone: Number(search) },
          { alternatePhone: Number(search) },
          { pincode: Number(search) }
        );
      }
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      User.find(query).skip(skip).limit(limit),
      User.countDocuments(query),
    ]);

    res.status(200).json({ data, total });
  } catch (error) {
    console.error("Fetch error : ", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/export", async (req, res) => {
  try {
    const { search = "" } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { alternatePhone: { $regex: search, $options: "i" } },
        { pincode: { $regex: search, $options: "i" } },
      ];
    }

    const data = await User.find(filter);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Filtered Data");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 20 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Alternate Phone", key: "alternatePhone", width: 20 },
      { header: "Address", key: "address", width: 30 },
      { header: "Pincode", key: "pincode", width: 15 },
    ];

    data.forEach((item) => worksheet.addRow(item));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="filtered-data.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ error: "Failed to export data" });
  }
});

module.exports = router;
