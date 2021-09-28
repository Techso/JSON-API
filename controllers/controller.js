const fs = require("fs");
const dataPath = "./data.json";

//Helper methods

const readFile = (filePath = dataPath, encoding = "utf8") => {
	fs.readFile(filePath, encoding, (err, data) => {
		if (err) {
			throw err;
		}
		return data;
	});
};
const writeFile = (filePath = dataPath, encoding = "utf8") => {
	fs.writeFileSync(filePath, fileData, encoding, (err) => {
		if (err) {
			throw err;
		}
		return readFile();
	});
};
exports.AllRecipes = (req, res) => {
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		var RecipeNames = [];
		JSON.parse(data).recipes.forEach((element) => {
			RecipeNames.push(element.name);
		});
		const AllRecipesName = { recipesName: RecipeNames };

		res.status(200).send(AllRecipesName);
	});
};

exports.Recipe = (req, res) => {
	var recipename = req.originalUrl.match(/([^\/]*)\/*$/)[1];

	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		const existingRecipes = JSON.parse(data).recipes;
		var RecipeNames = [];
		existingRecipes.forEach((element) => {
			RecipeNames.push(element.name);
		});
		const index = RecipeNames.indexOf(recipename);
		if (index >= 0) {
			const recipeDetail = JSON.parse(data).recipes[index];
			const message = {
				details: {
					ingredients: recipeDetail.ingredients,
					numSteps: recipeDetail.instructions.length,
				},
			};
			res.status(200).send(message);
		} else {
			res.status(200).send({});
		}
		//console.log(message)
	});

	//console.log(name)
};

exports.AddRecipe = (req, res) => {
	/*readFile(data => {
        
        req.body
        const newUserId = Date.now().toString();

        // add the new user
        data[newUserId.toString()] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('new user added');
        });
    },
        true);*/

	const newRecipe = req.body;
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		const existingRecipes = JSON.parse(data).recipes;
		var RecipeNames = [];
		existingRecipes.forEach((element) => {
			RecipeNames.push(element.name);
		});
		const index = RecipeNames.indexOf(newRecipe.name);
		if (index >= 0) {
			res.status(400).send({ error: "Recipe already exists" });
		} else {
			existingRecipes.push(newRecipe);
			const newRecipes = { recipes: existingRecipes };
			fs.writeFileSync(dataPath, JSON.stringify(newRecipes));
			res.status(201);
		}
		//console.log(message)
	});
};
exports.UpdateRecipe = (req, res) => {
	const newRecipe = req.body;

	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		const existingRecipes = JSON.parse(data).recipes;
		var RecipeNames = [];
		existingRecipes.forEach((element) => {
			RecipeNames.push(element.name);
		});
		const index = RecipeNames.indexOf(newRecipe.name);
		if (index < 0) {
			res.status(404).send({ error: "Recipe does not exist" });
		} else {
			existingRecipes[index] = newRecipe;
			const newRecipes = { recipes: existingRecipes };
			fs.writeFileSync(dataPath, JSON.stringify(newRecipes));
			res.status(204);
		}
	});
};

exports.DeleteRecipe = (req, res) => {
	var recipename = req.originalUrl.match(/([^\/]*)\/*$/)[1];
	fs.readFile(dataPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}
		existingRecipes = JSON.parse(data).recipes;
		var RecipeNames = [];
		existingRecipes.forEach((element) => {
			RecipeNames.push(element.name);
		});
		const index = RecipeNames.indexOf(recipename);
		if (index >= 0) {
			delete existingRecipes[index];
			const newRecipes = { recipes: existingRecipes };
			fs.writeFileSync(dataPath, JSON.stringify(newRecipes));
			res.status(200);
		} else {
			res.status(404).send({ error: "Recipe does not exist" });
		}
		//console.log(message)
	});
};
