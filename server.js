const bodyParser = require("body-parser");
const express = require("express");
const config = require("./config");
const controller = require("./controllers/controller");

// Server instance declaration
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Server listener declaration
app.set("port", config.port);
app.listen(app.get("port"), (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`Server is up and listening on port ${app.get("port")}..`);
});

app.get("/", controller.AllRecipes);
app.get("/recipe/:id", controller.Recipe);
app.post("/recipe", controller.AddRecipe);
app.put("/recipe", controller.UpdateRecipe);
app.delete("/recipe/:id", controller.DeleteRecipe);
