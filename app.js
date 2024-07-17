const express = require('express');
const app = express();

// Middleware to parse query parameters
app.use(express.json());

// Helper function to parse and validate numbers
function parseNumbers(nums) {
    if (!nums) throw new Error('nums are required.');
    const numArray = nums.split(',').map(num => {
        const parsed = parseFloat(num);
        if (isNaN(parsed)) throw new Error(`${num} is not a number.`);
        return parsed;
    });
    return numArray;
}

// Route for mean
app.get('/mean', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.nums);
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        res.json({ operation: 'mean', value: mean });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for median
app.get('/median', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.nums);
        numbers.sort((a, b) => a - b);
        const mid = Math.floor(numbers.length / 2);
        const median = numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
        res.json({ operation: 'median', value: median });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for mode
app.get('/mode', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.nums);
        const frequency = {};
        numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
        let maxFreq = 0;
        let mode = [];
        for (const num in frequency) {
            if (frequency[num] > maxFreq) {
                maxFreq = frequency[num];
                mode = [Number(num)];
            } else if (frequency[num] === maxFreq) {
                mode.push(Number(num));
            }
        }
        res.json({ operation: 'mode', value: mode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;
