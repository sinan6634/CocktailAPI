import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";
const token = "1";
const config = {
    headers: {Authorization: `Bearer ${token}`}
};

app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL+"/random.php", config);
        const drink = result.data.drinks[0];
        //console.log(drink);   
        const ingredients = [];
        const ingredientsQuantity = [];
        const keys = Object.keys(drink);
        keys.forEach((key, index) => {
            if(key.includes("strIngredient") && drink[key] != null) {
                ingredients.push(drink[key]);
                //console.log(drink[key]);
            }
            else if(key.includes("strMeasure") && drink[key] != null) {
                ingredientsQuantity.push(drink[key]);
                //console.log(drink[key]);
            }
        })
        res.render("index.ejs", {content: drink, ingredients: ingredients, ingredientsQuantity: ingredientsQuantity});

    } catch (error) {
        console.log("Error getting data: " + error);
        res.render("index.ejs", {content: error.data.error});
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});