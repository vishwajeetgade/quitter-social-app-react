const express = require('express');
const router = express.Router({ mergeParams: true });
const { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

// prefix - /api/user/:id/message
router.route('/').post(createMessage)

// prefix - /api/user/:id/message
router.route('/:message_id')
    .get(getMessage)
    .delete(deleteMessage)

module.exports = router;