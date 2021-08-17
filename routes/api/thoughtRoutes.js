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
    .post(createThought);

// /api/thoughts/<thoughtid>
router
    .route('/:thoughtid')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/<thoughtId>/<userid>
// router
//     .route('/:thoughtId/:userId/')
//     .post(createThought) 


// /api/thoughts/<thoughtid>/reactions
router
    .route('/:thoughtId/reactions')    
    .post(createReaction) 

// /api/thoughts/<thoughtId>/<reactionId>
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
