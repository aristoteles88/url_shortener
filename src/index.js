const app = require("./config/custom-express");

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log("API ativa!");