const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getRecentScheduledInvitations } = require('../controllers/recentScheduled');
const { getAllInvitations, getInvitation, updateInvitation, getPendingRespondedInvitations } = require('../controllers/invitationController');

const router = express.Router();

router.get('/get-all-invitations', protect, getAllInvitations);
router.get('/get-invitation/:id', protect, getInvitation);
router.get('/get-recent-scheduled', protect, getRecentScheduledInvitations);
router.get('/get-pending-responded', protect, getPendingRespondedInvitations);
router.post('/update-invitation/:id', protect, updateInvitation);

module.exports = router;