const Candidate = require("../../models/job-portal/candidateModel");

// =============================
// 1️⃣ Add Candidate
// =============================
const addCandidate = async (req, res) => {
    try {
        const data = req.body;

        const candidate = new Candidate({
            ...data,
            candidateStatus: "screening", // default status
        });

        await candidate.save();

        res.status(201).json({
            success: true,
            message: "Candidate added successfully",
            data: candidate,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =============================
// 2️⃣ Get All Candidates
// =============================
const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: candidates.length,
            data: candidates,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =============================
// 3️⃣ Get Single Candidate
// =============================
const getSingleCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        res.status(200).json({
            success: true,
            data: candidate,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =============================
// 4️⃣ Update Candidate
// =============================
const updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Candidate updated successfully",
            data: candidate,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =============================
// 5️⃣ Delete Candidate
// =============================
const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Candidate deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =============================
// 6️⃣ Update Candidate Status (Controlled Flow)
// =============================
const updateCandidateStatus = async (req, res) => {
    try {
        const { candidateStatus } = req.body;

        const allowedTransitions = {
            screening: ["shortlisted", "rejected", "on_hold"],
            shortlisted: ["interview_scheduled", "rejected", "on_hold"],
            interview_scheduled: ["interview_completed", "rejected"],
            interview_completed: ["selected", "rejected"],
            selected: [],
            rejected: [],
            on_hold: ["screening", "rejected"]
        };

        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        const currentStatus = candidate.candidateStatus;

        if (!allowedTransitions[currentStatus].includes(candidateStatus)) {
            return res.status(400).json({
                success: false,
                message: `Cannot change status from ${currentStatus} to ${candidateStatus}`,
            });
        }

        candidate.candidateStatus = candidateStatus;
        await candidate.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: candidate,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    addCandidate,
    getAllCandidates,
    getSingleCandidate,
    updateCandidate,
    deleteCandidate,
    updateCandidateStatus
};