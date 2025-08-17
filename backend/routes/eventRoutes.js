const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addEvent, getAllEvents, getEvent, editEvent, deleteEvent } = require('../controllers/eventContoller');

const router = express.Router();

router.post('/add-event', protect, addEvent);
router.get('/get-all-events', protect, getAllEvents);
router.get('/get-event/:id', protect, getEvent);
router.put('/edit-event/:id', protect, editEvent);
router.delete('/delete-event/:id', protect, deleteEvent);

module.exports = router;