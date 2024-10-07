const corsOptions = {
  origin: process.env.CORS_ALLOWED,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ["Content-Type"],
};

module.exports = corsOptions;
