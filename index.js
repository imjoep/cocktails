const express = require('express');
const mongoose = require('mongoose');

const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, '/public'), {
  maxAge: 0,
  dotfiles: 'ignore',
  etag: false
}));

// Connect to MongoDB
mongoose
  .connect(
//        'mongodb://mongo:27017/recipes/',
//	'mongodb://mongo:27017/docker-node-mongo',
//        'mongodb://mongo:27017/',
        //'mongodb://mongo:27017/test',
        'mongodb://mongo:27017/recipes',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

//default page load
app.get('/',(req,res)=>{
        try {
                Item.find((err,data)=>{
                if(err){
                        console.log(err)
                }else{
                        res.render('pages/home',{data:data});
                }
                });
        } catch (error) {
                console.log(error);
        }
});

// Autofill based on ingredient values
app.post('/search', (req, res) => {
  let q = req.body.query;
  let query = {
//    "$or": [{"name": {"$regex": q, "$options": "i"}}]
//  "$or": [{"ingredients.ingredient": {$exists: true, "$regex": q, "$options": "i"}}]
  "$or": [{"ingredients.ingredient": {$exists: true, "$regex": q}},{"name":{"$regex":q}}]
  };
  let output = [];
  Item.find(query).limit(6).then( itms => {
      if(itms && itms.length && itms.length > 0) {
          itms.forEach(item => {
//              console.log("++++++");
//              console.log(item);
//              console.log("++++++");
            let obj = {
                id: item.ingredients.ingredient,
                label: item.ingredients.ingredient
            };
                console.log("-------");
                console.log(obj[1]);
                console.log("-------");
            output.push(obj);
          });
      }
        res.json(output);
  }).catch(err => {
    res.sendStatus(404);
  });

});


// Navigate to Search Page with query parameters
app.get('/search_ing', (req, res) => {
var query = req.query.q;
console.log(req.query);
console.log(query);
var posts = [
     {title: "post1", author:"Cay"},
     {title: "Post2", author:"Hey"},
   ];
res.render('pages/search_ing', {query:query});
});

// Navigate to All Recipes page
app.get('/recipes', (req,res) => {
Item.find()
    .then(cocktails => res.render('pages/recipes', { cocktails }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});


app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
console.log("ADDDDDDDDD");
  newItem.save().then(item => res.redirect('/'));
});


// Navigate to About page
app.get('/about', (req,res) => {
  res.render('pages/about');
});


const port = 3000;

app.listen(port, () => console.log('Server running...'));
