const express = require('express')
require('dotenv').config();
const router = express.Router();
const zod = require('zod');
const FAQ = require('../db');
const axios = require('axios');

const FAQSchema = zod.object({
    question: zod.string(),
    answer: zod.string()
})

router.get('/', async (req, res) => {
    try {
        const faqs = await FAQ.find();

        const targetLang = req.query.lang || 'en';
        if (targetLang === 'en') {
            res.json(faqs);
            return;
        }
        const translatedFaqs = await Promise.all(faqs.map(async (faq) => {
            try {
                const questionResponse = await axios.post('https://free-translate-go-api.onrender.com/translate', {
                    text: faq.question,
                    to: targetLang
                });
                const answerResponse = await axios.post('https://free-translate-go-api.onrender.com/translate', {
                    text: faq.answer,
                    to: targetLang
                });

                return {
                    ...faq.toObject(),
                    question: questionResponse.data.translatedText,
                    answer: answerResponse.data.translatedText,
                };
            } catch (translationError) {
                console.error(`Error translating FAQ ${faq._id}:`, translationError);
                return faq;
            }
        }));

        res.json(translatedFaqs);
    } catch (err) {
        console.error('Error fetching FAQs:', err);
        res.status(500).json({ message: 'Error translating FAQs' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const faqId = req.params.id;
        const faq = await FAQ.findById(faqId);
        res.json(faq);
    } catch (err) {
        console.error('Error fetching FAQ:', err);
        res.status(500).json({ message: 'Error fetching FAQ' });
    }
});

router.post('/', async (req, res) => {
    try {
        const faqData = req.body;
        const parsedData = FAQSchema.parse(faqData);
        const newFaq = new FAQ(parsedData);
        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (err) {
        console.error('Error creating FAQ:', err);
        res.status(500).json({ message: 'Error creating FAQ' });
    }
});

module.exports = router;