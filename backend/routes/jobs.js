const express = require('express');
const Job = require('../models/Job');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    const { title, description, availableTime, amount } = req.body;

    try {
        const job = new Job({
            patient: req.user.id,
            title,
            description,
            availableTime,
            amount
        });
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const jobs = await Job.find().populate('patient');
        res.json(jobs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/:jobId/apply', verifyToken, async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        job.applicants.push(req.user.id);
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

