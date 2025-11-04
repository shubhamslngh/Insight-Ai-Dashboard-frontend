InsightAI Dashboard

InsightAI Dashboard is a full-stack AI productivity app that converts meeting transcripts into actionable task lists.
You can group tasks under projects, visualize progress with charts, and manage them with real-time status and priority tracking.

🚀 Features
🧩 Level 1 — Core Features

📝 Transcript Submission — submit meeting transcripts to auto-generate tasks using Gemini AI

🤖 AI-Powered Action Item Generation — LLM analyzes text to extract tasks

✅ Task Management — mark complete, delete, or edit tasks

📊 Progress Visualization — Pie chart of completed vs pending tasks

🎨 Modern UI — built with Next.js 15 + Shadcn UI + Tailwind CSS

☁️ Hosting Ready — can be deployed on Vercel (frontend) & Render (backend)

⚡ Level 2 — Enhancements

🔍 Filter + Sort Tasks — by status, priority, or creation date

🏷 AI-Assigned Priorities — tasks labeled High / Medium / Low

📈 Bar Chart Visualization — task distribution by priority

🗂 Project Grouping — tasks organized per project

💾 Supabase Database Integration — persistent task & project storage

🧰 Tech Stack
Layer	Technology
Frontend	Next.js 15, Shadcn UI, Tailwind CSS, Recharts
Backend	FastAPI (Python 3.9+)
Database	Supabase (PostgreSQL)
AI	Google Gemini 1.5 Flash (via google-generativeai)
Deployment	Vercel (frontend) + Render / Railway / Fly.io (backend)
📁 Project Structure
InsightAI/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── generate.py
│   │   │   ├── tasks.py
│   │   │   └── projects.py
│   │   ├── services/
│   │   │   └── llm_service.py
│   │   ├── lib/
│   │   │   └── db.py
│   │   └── schemas.py
│   └── requirements.txt
│
└── frontend/
    ├── app/
    │   ├── page.jsx
    │   ├── components/
    │   │   ├── TranscriptForm.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── ProgressPie.jsx
    │   │   └── PriorityBar.jsx
    │   └── lib/
    │       └── api.js
    └── package.json

⚙️ Backend Setup (FastAPI)
1️⃣ Clone the repository
git clone https://github.com/yourusername/insightai-dashboard.git
cd insightai-dashboard/backend

2️⃣ Create virtual environment
python3 -m venv venv
source venv/bin/activate

3️⃣ Install dependencies
pip install -r requirements.txt


If you don’t have a requirements.txt yet, create it with:

fastapi
uvicorn
supabase
python-dotenv
google-generativeai

4️⃣ Create .env
SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_SERVICE_KEY=<your-service-role-key>
GEMINI_API_KEY=<your-gemini-api-key>

5️⃣ Run FastAPI server
uvicorn app.main:app --reload


Server will start at
👉 http://127.0.0.1:8000

Swagger Docs:
👉 http://127.0.0.1:8000/docs

💻 Frontend Setup (Next.js)
1️⃣ Open frontend folder
cd ../frontend

2️⃣ Install dependencies
npm install
# or
yarn install

3️⃣ Create .env.local
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000

4️⃣ Run the dev server
npm run dev
# or
yarn dev


App will start at
👉 http://localhost:3000

🧠 Usage Flow

Enter a project name and paste your meeting transcript

Click Generate & Save Tasks — Gemini AI extracts tasks

Tasks are saved in Supabase under that project

Select the project → see its Pie & Bar charts

Manage tasks (mark complete, delete, edit priority or text)

Charts and progress update instantly

🧾 Example Environment File
Backend .env
SUPABASE_URL=https://xyzcompany.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key

Frontend .env.local
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000

☁️ Deployment
🔹 Backend (Render)

Push code to GitHub

Create new Render > Web Service

Environment = Python 3.9+

Start command:

uvicorn app.main:app --host 0.0.0.0 --port 10000


Add .env variables from above.

🔹 Frontend (Vercel)

Connect your repo to Vercel

In environment variables:

NEXT_PUBLIC_API_BASE=https://<your-backend-url>


Deploy!

🧩 API Endpoints
Method	Endpoint	Description
POST	/generate/	Generate tasks via Gemini AI
GET	/projects/	List all projects
POST	/projects/?name=	Create project
GET	/tasks/?project_id=	List tasks per project
POST	/tasks/	Add tasks
PATCH	/tasks/{id}	Update task
DELETE	/tasks/{id}	Delete task
🧑‍💻 Author

Shivam Singh
💼 Full-Stack Developer — Tech Initiator
🌐 Building AI-driven dashboards, analytics & automation tools
📧 shivamsingh.dev@example.com

🏁 License

This project is licensed under the MIT License — you’re free to use, modify, and distribute.