const router = require('express').Router();
const {Games} = require('../models')


router.get('/', (req, res) => {
    res.render('../views/homepage')
})
//have to make get request to games table 
router.get('/',async (req, res) =>{
try {
    const games = await Games.findAll({
        attributes: ['name', 'cover', 'genres'],
    });
    res.json(games)
}catch(err){
    console.error(err);
    res.status(500).json({message:'Error retriving the games'})
}
})

module.exports = router;