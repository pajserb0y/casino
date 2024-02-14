const config = require("../config");
const { validationResult } = require("express-validator");
const ethers = require("ethers");
const abi = require("../abi/tetherABI.json");

// @route   POST api/users
// @desc    Register User
// @access  Public
exports.getBalance = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //   const address = "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06";
  const address = req.query.address;
  if (typeof address !== "string" || address.length !== 42) {
    return res.status(400).json({ msg: "Invalid address" });
  }

  const provider = new ethers.AlchemyProvider(
    "sepolia",
    config.ALCHEMY_API_KEY
  );

  try {
    const tetherToken = new ethers.Contract(
      "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
      abi,
      provider
    );

    const balance = await tetherToken.balanceOf(address);
    return res.json({ balance: balance.toString() });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
