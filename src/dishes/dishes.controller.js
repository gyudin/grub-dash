const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function list(req, res) {
    res.json({ data: dishes });
}

function create(req, res) {
    const { data: { name, description, price, image_url } = {} } = req.body;
    const newDish = { id: nextId(), name, description, price, image_url };
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
}

function read(req, res) {
    res.json({ data: res.locals.dish });
}

function update(req, res, next) {
    const { dishId } = req.params;
    const { data: { id, name, description, price, image_url } = {} } = req.body;

    if (id && id !== dishId) {
        return next({ 
            status: 400, 
            message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}` 
        });
    }

    const dish = res.locals.dish;
    dish.name = name;
    dish.description = description;
    dish.price = price;
    dish.image_url = image_url;
    res.json({ data: dish });
}

function dishExists(req, res, next) {
    const { dishId } = req.params;
    const foundDish = dishes.find((dish) => dish.id === dishId);
    if (foundDish) {
        res.locals.dish = foundDish;
        return next();
    }
    next({ status: 404, message: `Dish id not found: ${dishId}` });
}

function validateDish(req, res, next) {
    const { data: { name, description, price, image_url } = {} } = req.body;

    if (!name) {
        return next({ status: 400, message: 'Dish must include a name' });
    }
    if (!description) {
        return next({ status: 400, message: 'Dish must include a description' });
    }
    if (price === undefined || typeof price !== 'number' || price <= 0) {
        return next({ status: 400, message: 'Dish must have a price that is an integer greater than 0' });
    }
    if (!image_url) {
        return next({ status: 400, message: 'Dish must include an image_url' });
    }
    next();
}


module.exports = {
    list,
    create: [validateDish, create],
    read: [dishExists, read],
    update: [dishExists, validateDish, update]
};
