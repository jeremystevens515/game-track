const router = require('express').Router();
const { Users, Reviews, Wishlist, Games } = require("../models");



// get request to / getting game data like name cover and genre of game 
router.get('/',async (req, res) =>{
try {
    const gamesData = await Games.findAll({
        attributes: ['name', 'cover', 'genres','id'],
    });
    gamesData.forEach(game => {
        const genresNames = game.genres.map(genre => genre.name)
        game.genres = JSON.stringify(genresNames);
        game.cover = game.cover.image_id;
        // game.coverImage = game.cover.id
        
    });
    res.render('homepage', {gamesData})
}catch(err){
    console.error(err);
    res.status(500).json({message:'Error retriving the games'})
}
})
//get request to take you to a specifics game page based off the games id 
router.get('/:id', async (req, res) => {
    try{
        const gamesInfo = await Games.findOne({
            where:{id: req.params.id},
            attributes:['name','cover','genres', "involved_companies",'first_release_date','summary','total_rating','similar_games'],
        });     
        let imageId;
        if (gamesInfo.cover){
            imageId = gamesInfo.cover.image_id;
        }
        res.render('gamepage',{gamesInfo, imageId})
    }catch (err){
        console.error(err);
        res.status(500).json({message:'Error retriving the game info'})
    }
})


//attempt at fetching the api data instead of the seed data 
// router.get('/', async (req, res) => {
//     try {
//         const response = await fetch('https//');
//         const data = await response.json();
//         res.render('homepage', {gameData:data});
//     }catch (err){
//         res.status(500).json ({message: 'Error retriveing api game data'})
//     }
// })


module.exports = router;
//what the data im receiving looks like just for reference 
//[
    // games {
    //     dataValues: { name: 'God of War', cover: [Object], genres: [Array] },
    //     _previousDataValues: { name: 'God of War', cover: [Object], genres: [Array] },
    //     uniqno: 1,
    //     _changed: Set(0) {},
    //     _options: {
    //       isNewRecord: false,
    //       _schema: null,
    //       _schemaDelimiter: '',
    //       raw: true,
    //       attributes: [Array]
    //     },
    //     isNewRecord: false
    //   },
    //   games {
    //     dataValues: { name: "Marvel's Spider-Man", cover: [Object], genres: [Array] },
    //     _previousDataValues: { name: "Marvel's Spider-Man", cover: [Object], genres: [Array] },
    //     uniqno: 1,
    //     _changed: Set(0) {},
    //     _options: {
    //       isNewRecord: false,
    //       _schema: null,
    //       _schemaDelimiter: '',
    //       raw: true,
    //       attributes: [Array]
    //     },
    //     isNewRecord: false
    //   }
    // ]