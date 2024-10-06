const corsOptions = {
  origin: "localhost:3000",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ["Content-Type"],
};

module.exports = corsOptions;
