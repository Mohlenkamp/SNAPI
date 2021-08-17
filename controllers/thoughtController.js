const User = require('../models/User');
const Thought = require('../models/Thought');


const thoughtController = {
     //get all thoughts
     getAllThought(req, res){
        Thought.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        }); 
    },

    //get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtid })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // add user thought
    createThought({ params,body}, res){
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId},
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
        Thought.findOneAndUpdate({ _id: params.thoughtId}, {$push: {reactions: body}}, {new:true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'Cannot create reaction: No thought found with this id'});
                    return;
                }
            res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
       // update thought by id
       updateThought({params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtid }, body, { new: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // delete thought
    deleteThought({params}, res){
        Thought.findOneAndDelete({ _id: params.thoughtid })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    // delete reaction
    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reactions: {_id: params.reactionId}}},
            { new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};


module.exports = thoughtController;