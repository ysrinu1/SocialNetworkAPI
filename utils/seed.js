const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});
  await Thought.deleteMany({});

  await Thought.collection.insertMany(thoughtData)
  const thoughtRes = await Thought.find()
  
  thoughtRes.forEach( thought => {
    const userOwnerIndex = userData.findIndex( user => user.username === thought.username)
    userData[userOwnerIndex].thoughts.push(thought["_id"])
  })

  await User.collection.insertMany(userData)

  console.info('Seeding complete!');
  process.exit(0);
});
