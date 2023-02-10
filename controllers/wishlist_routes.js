const router = require('express').Router();
const { Games } = require('../models/');
const { Users } = require('../models/');

router.get('/', async (req, res) => {
    console.log("Good get request!")
    try{
        const wishData = await Users.findAll();
        if (!wishData) {
            res
            .status(400).json({message: 'No users found. Start wishing!'});
            return;
        }
        const wishes = wishData.map((wish) => {
            return wish.get({ plain: true })
        })
    console.log(wishes)
    
        res.render('wishlist', { wishes })
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;