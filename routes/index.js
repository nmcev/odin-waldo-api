var express = require('express');
var router = express.Router();
const Character = require('../models/Character');
const User = require('../models/User');

function isWithinHotZone(clickedPosition, characterZone) {
  console.log(characterZone)
  const distance = Math.sqrt(
    Math.pow(clickedPosition.x - characterZone.x, 2) +
    Math.pow(clickedPosition.y - characterZone.y, 2)
  );

  return distance <= characterZone.radius;
}


router.post('/api/savePositions', async (req, res) => {
  const { name, coordination } = req.body;

  // check if the character is exist
  const exitingCharacter = await Character.findOne({ name });

  if (exitingCharacter) {
    return res.status(400).json({ msg: "Character already exist" });
  }

  if (!name || !coordination) {
    return res.status(400).json("missing inputs")
  }
  const newCharacter = new Character({
    name,
    coordination
  })

  try {
    await newCharacter.save();
    return res.status(201).json({ msg: "Character saved correctly", newCharacter });
  } catch (error) {
    return res.status(500).json({ msg: "Error in saving character", error })
  }
})


router.post('/api/checkPosition', async (req, res) => {

  const { clickedPosition, name } = req.body;
  const characterZone = await Character.findOne({ name })

  const withHotZone = isWithinHotZone(clickedPosition, characterZone.coordination);

  if (withHotZone) {
    res.status(200).json({ msg: `You found ${characterZone.name}`, found: true, clickedPosition: characterZone.coordination });
  } else {
    res.json({ found: false })
  }
})

router.post('/api/submitName', async (req, res) => {
  const { name, duration } = req.body;

  const existName = await User.findOne({ name });

  if (existName) {
    return res.json({ error: 'Name already exist' })
  }
  const newUser = new User({
    name,
    duration
  });

  try {
    await newUser.save();
    return res.json({ msg: 'name inserted', valid: true });
  } catch (error) {
    return res.json({ msg: "error in creating user" })
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json({ users });
  } catch (error) {
    return res.json({ error })
  }
})
module.exports = router;
