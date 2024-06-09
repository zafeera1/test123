const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  savedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ]  
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;