const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('../views/homepage')
})

module.exports = router;