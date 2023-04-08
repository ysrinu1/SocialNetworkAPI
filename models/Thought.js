const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        },
    },
    {
        timestamps: true,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        },
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true,
    }
);

thoughtSchema.virtual("reactionCount").get( function() {
    return this.reactions.length
})

const Student = model("student", thoughtSchema);

module.exports = Student;
