const router = require('express').Router();

const{
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
    getAllThought,
    getThoughtById
} = require('../../controllers/thoughtController');
const { put } = require('./userRoutes');

router
    .route('/')
    .get(getAllThought)

// /api/thoughts/<thoughtid>
router
    .route('/:id')
    .get(getThoughtById)
    .post(createThought)  //id will be userId instead
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .post(createReaction)

// /api/thoughts/<thoughtId>/<reactionId>
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;
