const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('catalog', {
        title: 'All Accomodations'
    });
});

router.get('/:id', (req, res) => {
    res.render('details', {
        title: 'Accomodation details'
    });
});

module.exports = router;