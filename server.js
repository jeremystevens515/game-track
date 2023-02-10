const express = require("express");
const app = express();
const PORT = process.env.PORT||3001;



const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.listen(PORT,()=>{
    console.log("Hello Team!");
});