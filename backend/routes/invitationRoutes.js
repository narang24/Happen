const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getRecentScheduledInvitations } = require('../controllers/recentScheduled');
const { getAllInvitations, getInvitation } = require('../controllers/invitationController');

const router = express.Router();

router.get('/get-all-invitations', protect, getAllInvitations);
router.get('/get-invitation/:id', protect, getInvitation);
router.get('/get-recent-scheduled-invitations', protect, getRecentScheduledInvitations);

module.exports = router;