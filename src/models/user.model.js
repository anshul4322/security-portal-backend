const mongoose = require("mongoose");
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        empId: {
          type: String,
          required: true,
          unique: true
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,
          validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Invalid email");
            }
          },      
        },
        password: {
          type: String,
          validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
              throw new Error(
                "Password must contain at least one letter and one number"
              );
            }
          },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

userSchema.pre("save", async function (next) {
    const user = this;
    next();
});

userSchema.methods.isPasswordMatch = async function(password){
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model("User", userSchema);

module.exports.User = User;

module.exports = {
    User,
};