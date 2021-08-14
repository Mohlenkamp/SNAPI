const User = require('../models/User');
const Thought = require('../models/Thought');


const thoughtController = {
    // add user thought
    createThought({ params,body}, res){
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $push: {thoughts: _id}},
                    {new: true}
                );
        })
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //add reaction to thought
    createReaction({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.thoughtId}, {$push: {reaction: body}}, {new:true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'Cannot create reaction: No thought found with this id'});
                    return;
                }
            res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    
    // delete thought
    deleteThought({params},res){
        Thought.findOneAndDelete({ _id: params.thoughtId})
            .then(dbThoughtData =>{
                if(!dbThoughtData){
                    res.status(404).json({ message: 'Cannot delete thought: No thought found with this id'});
                    return;
                }
                return User.findOneAndUpdate(
                    { _iod: params.userId},
                    { $pull: {thoughts: params.thoughtId}},
                    {new: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData){
                    res.status(404).json({ message: 'Cannot delete thought: No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // delete reaction
    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reaction: {reactionId: params.reactionId}}},
            { new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};


module.exports = thoughtController;