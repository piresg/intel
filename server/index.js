const express = require("express");
const axios = require("axios");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/abuseip/:ipAddress", async (req, res) => {
  try {
    const ipAddress = req.params.ipAddress;
    const apiKey =
      "5d6fa453b46be3ebad854708867c8ef9ef95406260bfd57a2c4757213d5f4b02e9d7a4cb87ae194a";
    const response = await axios.get(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${ipAddress}&maxAgeInDays=365`,
      {
        headers: {
          Key: apiKey,
          Accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
