const { createFacility, getAllFacilities, addFacilities } = require('../services/facilityService');
const { getById } = require('../services/roomService');

const facilityController = require('express').Router();

facilityController.get('/create', (req, res) => {
    // show creation form
    res.render('createFacility', {
        title: 'Add New Facility'
    })
})

facilityController.post('/create', async (req, res) => {
    // console.log(req.body);
    try{
        await createFacility(req.body.label, req.body.iconUrl);
        res.redirect('/catalog');
    }catch(err) {
        // TODO RENDER ERRORS
        res.render('createFacility', {
            title: 'Add New Facility'
        })
    }
    // take data from body
    // create model instance
    // profit
})

facilityController.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    
    if (!req.user || room.owner != req.user._id) {
        return res.redirect("/auth/login");
    }
    
    const facilities = await getAllFacilities();
    facilities.forEach(f => {
        // console.log('checking', f.label, room.facilities.some(id => id == f._id));
        // console.log('checking', f.label, f._id);
        // console.log(room.facilities.map(id => `-- ${id} ${id.toString() == f._id.toString()}`).join('\n'));

        if (room.facilities.some(id => id.toString() == f._id.toString())) {
            f.checked = true;
        }
    })
    // console.log(room.facilities, facilities)

    res.render('decorate', {
        title: 'Add facility',
        room,
        facilities
    })
})

facilityController.post('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    
    if (!req.user || room.owner != req.user._id) {
        return res.redirect("/auth/login");
    }
    // console.log(req.body);
    await addFacilities(req.params.roomId, Object.keys(req.body));
    res.redirect('/facility/' + req.params.roomId + '/decorateRoom');
})


module.exports = facilityController;