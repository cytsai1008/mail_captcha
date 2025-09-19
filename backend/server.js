const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/verify', async (req, res) => {
    const { token } = req.body;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
        );
        console.log('reCAPTCHA verification response:', response.data);

        if (response.data.success && response.data.score >= 0.5) {
            const responseData = { success: true, email: process.env.MAIL_TO_EMAIL };
            console.log('Sending response:', responseData);
            res.json(responseData);
        } else {
            const responseData = { success: false, message: 'reCAPTCHA verification failed.' };
            console.log('Sending response:', responseData);
            res.json(responseData);
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        const responseData = { success: false, message: 'Error verifying reCAPTCHA.' };
        console.log('Sending response:', responseData);
        res.status(500).json(responseData);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
