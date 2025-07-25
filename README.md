# AI-Powered Ticket Management System

## Overview
An intelligent ticket management system that leverages AI to automatically analyze, prioritize, and assign support tickets to the most qualified moderators based on their skills and expertise.

## Key Features
- 🤖 **AI-Powered Analysis**: Automatically analyzes ticket content using Google's Gemini AI model
- 🎯 **Smart Prioritization**: Assigns priority levels (low/medium/high) based on ticket content
- 👥 **Intelligent Assignment**: Matches tickets with moderators based on required technical skills
- 📝 **Automated Documentation**: Generates helpful notes and resource suggestions
- ✉️ **Email Notifications**: Automatically notifies assigned moderators using Mailtrap for safe email testing

## Technical Stack
- **Backend**: Node.js with Express
- **Frontend**: React
- **Database**: MongoDB
- **AI Integration**: Google Gemini AI
- **Task Processing**: Inngest
- **Email Service**: Mailtrap (SMTP testing)

## How It Works
1. When a new ticket is created, the system triggers an AI analysis
2. The AI agent:
   - Summarizes the issue
   - Determines priority
   - Identifies required technical skills
   - Provides helpful notes for moderators
3. The system automatically matches the ticket with qualified moderators based on their skills
4. Assigned moderators receive email notifications via Mailtrap


## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Tickets
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets` - Get all tickets for logged-in user
- `GET /api/tickets/:id` - Get ticket details

### Admin
- `GET /api/auth/users` - Get all users (Admin only)
- `POST /api/auth/update-user` - Update user role & skills (Admin only)

## Getting Started
1. Clone the repository
2. Install dependencies:
   ```bash
   cd ai-ticket-assistant && npm install
   cd ../ai-ticket-frontend && npm install
