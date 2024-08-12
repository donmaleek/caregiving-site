const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    availableTime: { type: Date, required: true },
    amount: { type: Number, required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

