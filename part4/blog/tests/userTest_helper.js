const User = require('../models/user')

const initialUsers = [
  {
    username: 'root',
    name: 'Reinhold Messner',
    passwordHash: 'invalidPasswordHash'
  },
  {
    username: 'guest',
    name: 'Hans-Ulrich Müller',
    passwordHash: 'notSoValidHash'
  }
]

const nonExistingId = async () => {
  const user = new User({ title: 'willremovesoon', })
  await user.save()
  await user.remove()
  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}



module.exports = {
    initialUsers, nonExistingId, blogsInDb: usersInDb
}