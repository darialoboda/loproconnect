// routes/testRoutes.js
const express = require('express');
const { 
    createTest, 
    getTests, 
    getTestById, 
    updateTest, 
    deleteTest,
    getTestsByCourseId,
    saveTestResults
} = require('../controllers/testController');
const router = express.Router();

// Routes for tests
router.post('/', createTest);
router.get('/', getTests);
router.get('/:id', getTestById);
router.put('/:id', updateTest);
router.delete('/:id', deleteTest);
router.get('/course/:id', getTestsByCourseId);
router.post('/save', saveTestResults);


module.exports = router;
