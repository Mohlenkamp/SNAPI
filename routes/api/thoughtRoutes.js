const router = require('express').Router();

const{
    createThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts/<userId>
router.route('/:userId').post(createThought);

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .put(createReaction)
    .post(createReaction)
    .delete(deleteThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;