const router = require('express').Router();

const {
        getAllUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        createFriend,
        deleteFriend
} = require('../../controllers/userController');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)   //could also make this just a route for add friend or add thought function
    .post(updateUser)
    .delete(deleteUser);

//  /api/users/:<userId>/friends.:friendId
router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend)

module.exports = router;