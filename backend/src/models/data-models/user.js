import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  createdAt: { type: Date, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

userSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  }
});

userSchema.methods.comparePassword = async (userPassword, password) => {
  const match = await bcrypt.compare(userPassword, password);
  return match;
};

const User = mongoose.model('User', userSchema);

export default User;
