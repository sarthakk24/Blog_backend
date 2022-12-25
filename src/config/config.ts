require("dotenv").config();

export default {
  baseurl: process.env.BASE_URL || `http://localhost:${process.env.PORT}`,
  port: process.env.PORT || 5050,
  api: {
    prefix: "/api",
  },
};
