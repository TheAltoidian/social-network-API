const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    addThought,
    editThought,
    removeThought,
    addReply,
    removeReply
} = require('../../controllers/thought-controller');

// /api/Thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/Thoughts
router
    .route('/').get(getAllThought);

router
    .route('/:ThoughtId')
    .get(getThoughtById)
    .put(editThought)
    .delete(removeThought);

// /api/Thoughts/<userId>/<ThoughtId>
// router
//     .route('/:userId/:ThoughtId')
//     .put(addReply);

// /api/Thoughts/<userId>/<ThoughtId>/<replyId>
router.route('/:userId/:ThoughtId/:replyId').delete(removeReply);

module.exports = router;
