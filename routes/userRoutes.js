const router = require("express").Router();
const { User } = require("../models");

// Get all users
router.get("/", async (req, res) => {
    try {
        const user = await User.find();

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get a single user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user)
            return res.status(404).json({ message: "No user with that ID" });
        console.log(user.createdAt);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Post new user
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Put to update user
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user)
            return res.status(404).json({ message: "No user with that ID" });
        
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        if (!user)
            return res.status(404).json({ message: "No user with that ID" });
        
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// Post new friend
router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user)
            return res.status(404).json({ message: "No user with that ID" });

        user.friends.push(req.params.friendId);
        await user.save();

        
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Delete friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user)
            return res.status(404).json({ message: "No user with that ID" });

        user.friends = user.friends.filter((friendId) => {
            return friendId != req.params.friendId;
        });
        await user.save();

        
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;
