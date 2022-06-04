const router = require('express').Router();

const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser
} = require('../../controllers/user-controller');

// GET ALL and POST USERS   -   api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    
// GET SINGLE USER   -   api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;