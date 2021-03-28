const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '605a9081777fce23c02e1c25',
            location: `${cities[random1000].city},  ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, exercitationem ex voluptate quae maxime delectus soluta dicta quos vel atque, commodi id ad dignissimos sapiente doloribus dolorum, autem aliquid mollitia!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/polesexual-productions/image/upload/v1616870795/YelpCamp/eo0zvfuwyvejasyrnkdc.jpg',
                    filename:  'YelpCamp/jjfjfgkejqci9ftwbczj'
                },
                // {
                //     url: 'https://res.cloudinary.com/polesexual-productions/image/upload/v1616653415/YelpCamp/svh3tf1tzllnoewivdvg.jpg',
                //     filename:  'YelpCamp/svh3tf1tzllnoewivdvg'
                // }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
}); 