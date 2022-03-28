const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required."],
        minLength: [2, "First name must be at least 2 characters in length."],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required."],
        minLength: [2, "Last name must be at least 2 characters in length."],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Email is required."],
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be 8 characters or longer."]
      }
    ,
    allergies: {
      type: String,
      trim: true,
      default: ""
    },
    restrictions: [],
    age: {
      type: Number,
      default: 0
    },
    quote: {
      type: String,
      trim: true,
      default: 'Let food be thy medicine.'
    }, 
    pic: {
      type: String,
      default: '../static/no-profile.png',
    }
}, { timestamps: true });


UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password.');
}
next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

module.exports = mongoose.model("User", UserSchema);