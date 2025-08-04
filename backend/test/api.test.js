const request = require('supertest');
require('dotenv').config('path');

const BASE_URL= `http://localhost:$process.env.PORT || 5000`;