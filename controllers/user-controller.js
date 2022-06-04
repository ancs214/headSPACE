const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
    //GET ALL USERS   -   /api/users
    getAllUsers(req, res) {
        User.find({})
            //populate with thought model 
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            //sort in DESC order by id value
            .sort({ _id: -1 })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET SINGLE USER   -   /api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            //sort in DESC order by id value
            .sort({ _id: -1 })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //CREATE NEW USER   -   /api/users   -   username, email
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    //UPDATE USER   -   /api/users/:id   
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    //DELETE USER   -   /api/users/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => res.status(400).json(err));
    }

}

module.exports = userController;