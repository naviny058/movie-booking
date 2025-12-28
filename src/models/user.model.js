const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { USER_ROLE, USER_STATUS } = require('../utills/constant')
/**
 * Defines the schema of theatre resource to be stored in the db
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
    required: true
  },
  password: {
    type: string,
    requried: true,
    minLength: 6,
  },
  userRole: {
    type: string,
    required: true,
    enums: {
      values: [USER_ROLE.client, USER_ROLE.customer, USER_ROLE.admin],
      message: 'Inavalid user role given'
    },
    default: USER_STATUS.approved
  },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  // a trigger to encrypt the plain password before saving the user
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
/**
 * This is going to be an instance method for user, to compare a password
 * with the stored encrypted password
 * @param plainPassword -> input password given by user in sign in request
 * @returns boolean denoting whether passwords are same or not ?
 */
userSchema.method.isValidPassword = async function (plainPassword) {
  const currentUser = this;
  const compare = await bcrypt.compare(plainPassword, currentUser.password);
  return compare;
}
const User = mongoose.model('User', userSchema);
module.exports = User;