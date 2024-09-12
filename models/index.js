const Favorite = require('./Favorite');
const User = require('./User')

Favorite.belongsTo(User)
User.hasMany(Favorite)

module.exports = { Favorite, User };
