const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: true,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },

        dob: {
            type: Date,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        designation: {
            type: String,
            required: true,
        },

        totalExperience: {
            type: Number, // in years
            required: true,
            min: 0,
        },

        relevantExperience: {
            type: Number, // in years
            required: true,
            min: 0,
        },

        currentCTC: {
            type: Number, // in LPA
            required: true,
            min: 0,
        },

        expectedSalary: {
            type: Number, // in LPA
            required: true,
            min: 0,
        },

        noticePeriod: {
            type: String, // e.g. Immediate, 30 Days
            required: true,
        },

        employmentType: {
            type: String,
            enum: ["fullTime", "partTime", "contract", "remote"],
            required: true,
        },

        preferredLocation: {
            type: String,
            required: true,
        },

        skills: {
            type: [String], // multiple skills
            required: true,
        },

        resume: {
            type: String, // store file URL or file path
            required: true,
        },

        highestQualification: {
            type: String,
            required: true,
        },

        universityName: {
            type: String,
            required: true,
        },

        passingYear: {
            type: Number,
            required: true,
        },

        candidateStatus: {
            type: String,
            enum: ["screening", "interview", "selected", "rejected"],
            default: "screening",
        },
        //         screening // shortlisted // interview_scheduled// interview_completed// selected// rejected// on_hold// offer_released// offer_accepted// offer_declined

        remarks: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);