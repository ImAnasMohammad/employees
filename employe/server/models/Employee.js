const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        mobileNo: {
            type: String,
            required: true,
            match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'],
        },
        designation: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'Other'], // Restricts to specified options
            required: true,
        },
        courses: {
            type: [String], // Array of strings for courses
            default: [],
        },
        img: {
            type: String, // Path or URL of the uploaded image
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
