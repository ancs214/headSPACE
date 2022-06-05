const { Thought, User } = require('../models');

const thoughtController = {
    //GET ALL THOUGHTS   -   api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET A SINGLE THOUGHT BY ID   -   api/thoughts/:thought_id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //CREATE NEW THOUGHT   -   api/thoughts/:thought_id   -   thoughtText, username
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
              );
        })
        .then(thoughtData => {
            if (!thoughtData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(thoughtData);
          })
          .catch(err => res.json(err));
    },

    //UPDATE A THOUGHT   -   api/thoughts/:thought_id  
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //DELETE A THOUGHT   -   api/thoughts/:thought_id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    //POST A REACTION TO A THOUGHT   -   api/thoughts/:thoughtId/reactions
    postReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            {$push: { reactions: body } },
            { new: true, runValidators: true }
            )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err));
    },

    //DELETE A REACTION   -   api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    }

}



module.exports = thoughtController;
