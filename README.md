# SmartBlog 🧠✍️

SmartBlog is a full-stack blog publishing platform with category filtering, comment system, AI-based content generation, and profile dashboard for authors.

## Features
- Author login/signup with JWT
- Create, delete, and view your own blogs
- Public blog feed with filtering
- Comment system
- AI content generator (Gemini API)
- Responsive design with animations

## Tech Stack
- React + Vite
- Django REST Framework
- PostgreSQL
- JWT Auth
- Render & Netlify

## 🔐 Environment Configuration
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True

# Allowed Hosts (comma-separated if multiple)
ALLOWED_HOSTS=localhost,127.0.0.1

# PostgreSQL Database
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# Gemini API Key
GEMINI_API_KEY=your-gemini-api-key


## Installation
1. Clone the repo
2. Setup `.env` as described
3. `npm install` in frontend
4. `python manage.py migrate` in backend
5. Run both servers and explore

## License
MIT