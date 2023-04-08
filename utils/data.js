const reaction = {
    reactionBody:
        "It is worth the exercise that comes out of it",
};

const thoughtData = [
  {
    thoughtText: "Thought about this...",
    reactions: []
  },
  {
    thoughtText: "Thought about that...",
    reactions: []
  },
  {
    thoughtText: "Thought about this and that...",
    reactions: []
  },
  {
    thoughtText: "Thought about those...",
    reactions: []
  },
  {
    thoughtText: "Thought about these...",
    reactions: []
  },
  {
    thoughtText: "Thought about this thing...",
    reactions: []
  },
  {
    thoughtText: "Thought about these things...",
    reactions: []
  },
  {
    thoughtText: "Thought about that thing...",
    reactions: []
  },
  {
    thoughtText: "Thought about those things...",
    reactions: []
  },
  {
    thoughtText: "Thought about this stuff...",
    reactions: []
  },
  {
    thoughtText: "Thought about that stuff...",
    reactions: []
  },
  {
    thoughtText: "Thought about this stuff and those things...",
    reactions: []
  },
  {
    thoughtText: "Thought about these things and that stuff...",
    reactions: []
  },
  {
    thoughtText: "Thought about this stuff and this thing...",
    reactions: []
  },
]

const userData = [
    {
        username: "Srini15",
        email: "srini15@gmail.com",
        thoughts: [],
        friends: [],
    },
    {
        username: "Srini15",
        email: "srini15@gmail.com",
        thoughts: [],
        friends: [],
    },
    {
        username: "srini99",
        email: "srini99@gmail.com",
        thoughts: [],
        friends: [],
    },
    {
        username: "srini99",
        email: "srini99@gmail.com",
        thoughts: [],
        friends: [],
    },
];

thoughtData.forEach(thought => {
  const randomUser = Math.floor(Math.random() * userData.length)
  thought.username = userData[randomUser].username
  
  for (let i = 0; i < 5; i++) {
    thought.reactions.push(reaction)
  }
});

module.exports = { userData, thoughtData}