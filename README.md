# Hiring FAQ API

## Overview
This is a simple FAQ backend system built using Node.js, Express, and MongoDB. The API allows users to create, retrieve, and translate FAQs into different languages.

## Features
- Fetch all FAQs with optional translation
- Retrieve a single FAQ by ID
- Add new FAQs
- Supports translation via an external API

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB (local or cloud-based, such as MongoDB Atlas)

### Setup Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/paras-verma7454/hiring.git
   cd hiring
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     ```
4. Start the server:
   ```sh
   npm start
   ```
   The server will run at `http://localhost:3000`.

## API Usage

### Get All FAQs
**Endpoint:** `GET /api/faqs`

**Optional Query Parameter:**
- `lang` (default: `en`) - Specify the target language for translation.


**Example Request:**
```sh
curl -X GET "http://localhost:3000/api/faqs?lang=fr"
```

**Example Response:**
```json
[
  {
    "_id": "65a123456789",
    "question": "Quelle est votre politique de retour ?",
    "answer": "Vous pouvez retourner les articles sous 30 jours.",
  }
]
```

### Get a Specific FAQ
**Endpoint:** `GET /api/faqs/:id`

**Example Request:**
```sh
curl -X GET "http://localhost:3000/api/faqs/65a123456789"
```

**Example Response:**
```json
{
  "_id": "65a123456789",
  "question": "What is your return policy?",
  "answer": "You can return items within 30 days."
}
```

### Create a New FAQ
**Endpoint:** `POST /api/faqs`

**Request Body:**
```json
{
  "question": "How do I reset my password?",
  "answer": "Click on 'Forgot Password' and follow the instructions."
}
```

**Example Request:**
```sh
curl -X POST "http://localhost:3000/api/faqs" \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I reset my password?", "answer": "Click on Forgot Password and follow the instructions."}'
```

**Example Response:**
```json
{
  "_id": "65b456789012",
  "question": "How do I reset my password?",
  "answer": "Click on 'Forgot Password' and follow the instructions."
}
```

## Contribution Guidelines

### How to Contribute
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Added new feature"`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a pull request.

### Code Guidelines
- Follow standard JavaScript coding conventions.
- Use meaningful commit messages.
- Ensure all new code is covered by tests.

## License
This project is licensed under the MIT License.



