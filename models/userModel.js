const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Add regex validation for email if needed
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        // Add regex validation for mobile if needed
    },
    password: {
        type: String,
        required: true,
    },
    role : { 
        type: String,
        default : "user"

    },
    cart:{
        type:Array,
        default: [],

    },
    address : [{type: mongoose.Schema.Types.ObjectId, ref:"Address"}],
    wishlist : [{type: mongoose.Schema.Types.ObjectId , ref:"Product"}],
    RefreshToken: {
        type:String,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10); // Use async version
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', userSchema);
