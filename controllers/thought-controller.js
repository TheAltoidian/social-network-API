const { Thought, User } = require('../models');

const ThoughtController = {
    // get Thoughts
    getAllThought({ params, body }, res) {
        Thought.find({})
            // .populate({
            //     path: 'users',
            //     select: '-__v'
            // })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one throught by id
    getThoughtById({ params, body }, res) {
        console.log(params);
        console.log("||||||||");
        console.log(params.ThoughtId);
        Thought.findOne({ _id: params.id })
            // .populate({
            //     path: 'users',
            //     select: '-__v'
            // })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // add Thought
    addThought({ params, body }, res) {
        // console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //edit a thought
    editThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // add Reaction
    addReply({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // remove Thought
    removeThought({ params }, res) {
        console.log(params.ThoughtId);
        Thought.findOneAndDelete({ _id: params.ThoughtId })
            .then(dbUserData => res.json(dbThoughtData))
            .catch(err => res.json(err));

    },
    // remove reply
    removeReply({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;