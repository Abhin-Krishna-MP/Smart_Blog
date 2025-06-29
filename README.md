# 🧠✍️ SmartBlog

SmartBlog is a modern **full-stack blog publishing platform** that combines author profiles, blog management, category filtering, commenting, and AI-powered content generation into one seamless experience.

---

## 🚀 Features

✅ Author login & signup (JWT-based)  
📝 Create, delete, and manage your own blogs  
🌐 Public blog feed with category filtering  
💬 Comment system per blog post  
🤖 AI content generation (powered by Gemini API)  
📱 Fully responsive design with smooth animations  
📂 Author dashboard with profile & stats

---

## ⚙️ Tech Stack

| Frontend        | Backend        | Database   | Auth      | AI          | Hosting          |
|-----------------|----------------|------------|-----------|-------------|------------------|
| React + Vite    | Django REST    | PostgreSQL | JWT (DRF) | Gemini API  | Render & Netlify |

---

## 🔐 Environment Configuration

Create a `.env` file in the backend directory and configure the following:

```env
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
1. Clone the repository
git clone https://github.com/your-username/smartblog.git
cd smartblog

2. Setup backend
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

3. Setup frontend
cd ../frontend
npm install
npm run dev


## License
MIT