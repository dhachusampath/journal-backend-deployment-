const express = require('express');
const router = express.Router();

const  {createContact,getContact} = require('../controllers/contactController')

router.post(
  '/',
  createContact
)

router.get('/',getContact);

module.exports = router;