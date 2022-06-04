const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought
} = require('../../controllers/thought-controller');

//GET ALL THOUGHTS   -   api/thoughts
router 
    .route('/')
    .get(getAllThoughts)


router
    .route('/:id')
    .get(getThoughtById)
    .post(addThought)

module.exports = router;