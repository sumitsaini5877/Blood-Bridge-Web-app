const express=require('express');
const { addConsumer ,getConsumers} = require('../controllers/consumerController');

const router = express.Router();


router.post('/con',addConsumer)

router.get('/con', getConsumers);
module.exports= router