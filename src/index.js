const app = require("./config/custom-express");

const PORT = process.env.PORT || 5050;

console.log("Aplicação rodando na porta: " + PORT);

app.listen(PORT);

console.log("API ativa!");