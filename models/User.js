const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (v) =>
                    /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v),
                message: (props) => `${props.value} is not a valid email.`,
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(createdAt) {
                if (createdAt) return createdAt.toISOString().split("T")[0];
            },
        },
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
        virtuals: true
    }
);

userSchema.virtual("friendCount").get( function() {
    return this.friends.length
})

const User = model("user", userSchema);

module.exports = User;
