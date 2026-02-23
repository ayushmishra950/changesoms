const router = require("express").Router();
const {
    addCandidate,
    getAllCandidates,
    getSingleCandidate,
    updateCandidate,
    deleteCandidate,
    updateCandidateStatus
} = require("../../controllers/job-portal/candidateController");

router.post("/add", addCandidate);
router.get("/get", getAllCandidates);
router.get("/getbyid", getSingleCandidate);
router.put("/update", updateCandidate);
router.delete("/delete/:id", deleteCandidate);
router.patch("/update/status", updateCandidateStatus);

module.exports = router;