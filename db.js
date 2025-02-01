require('dotenv').config();
const dbUrl= process.env.DB_URL
const mongoose = require('mongoose');
mongoose.connect(dbUrl)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        minlength: 3
    },
    answer: {
        type: String,
        required: true,
        minlength: 3
    }
})

const FAQ= mongoose.model('FAQ', faqSchema);
module.exports= FAQ;