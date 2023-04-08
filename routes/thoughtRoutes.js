const router = require("express").Router();
const { Thought, User } = require("../models");

/*========================= /thoughts =========================*/

// Get all thoughts
router.get("/", async (req, res) => {
    try {
        const thought = await Thought.find();

        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get single thought
router.get("/:id", async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id });
        if (!thought)
            return res.status(404).json({ message: "No thought with that ID" });

        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Post new thought
router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return res
                .status(404)
                .json({ message: "No user with that username" });

        const thought = await Thought.create(req.body);

        user.thoughts.push(thought["_id"]);
        await user.save();

        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Put to update thought
router.put("/:id", async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!thought)
            return res.status(404).json({ message: "No thought with that ID" });

        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Delete thought
router.delete("/:id", async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete({ _id: req.params.id });
        if (!thought)
            return res.status(404).json({ message: "No thought with that ID" });

        const user = await User.findOne({ username: thought.username });
        user.thoughts = user.thoughts.filter((thought) => {
            return thought["_id"] != req.params.id;
        });

        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

/*============== /thoughts/:thoughtId/reactions ===============*/

// Post new reaction
router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought)
            return res.status(404).json({ message: "No thought with that ID" });

        thought.reactions.push(req.body);
        await thought.save();

        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Delete a reaction
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought)
            return res.status(404).json({ message: "No thought with that ID" });

        thought.reactions = thought.reactions.filter((reaction) => {
            return reaction.reactionId != req.params.reactionId;
        });
        await thought.save();

        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;
