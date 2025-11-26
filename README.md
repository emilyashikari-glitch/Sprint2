
# SOP Training & Gamification Portal

A simple end-to-end SOP training portal:

- Manager uploads SOP docs (PDF or text).
- App uses **Google Gemini** to:
  - Extract text from PDFs.
  - Generate multiple-choice quizzes from SOP content.
- Manager assigns SOPs to employees.
- Employees log in, take quizzes, and must score **100%** to pass.
- Training is gamified with points, levels, and badges.

Runs as a small Node/Express server with a single-page front-end.

---

## Features

### Manager

- **Login** as: `manager@company.com` (pre-seeded account).
- **Upload SOPs**
  - Accepts `.pdf` and `.txt`.
  - PDFs are sent to Gemini for text extraction.
  - Text is sent to Gemini to generate a quiz (5 MCQs, 4 options each).
- **Assign trainings**
  - Assign uploaded SOPs to any employee.
  - Toggle assignment on/off per employee per SOP.
- **Manage employees**
  - Add employees (name + email).
  - View leaderboard: points, completion %, levels, badges.
- **Dashboard overview**
  - Total SOPs.
  - Total employees.
  - Average completion rate.

### Employee

- **Login** with their email (created by manager).
- **Dashboard**
  - See assigned SOPs.
  - Track completion percentage and points.
  - View level and earned badges.
- **Quizzes**
  - Question progress bar.
  - Immediate feedback with correct/incorrect highlighting.
  - Must score **100%** to pass and earn points.
  - Passing grants points → levels → badges.

---

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Single HTML file with:
  - Tailwind CSS (CDN)
  - Lucide icons (CDN)
  - Vanilla JS app (no framework)
- **AI:** Google Gemini API (via HTTPS fetch from the browser)
- **Storage:**
  - `window.storage` if provided (e.g. LMS/Canvas environment)
  - Fallback to `localStorage` when running standalone

---

## Project Structure

```text
.
├─ server.js        # Express server for local hosting
├─ package.json     # Node project metadata and dependencies
└─ index.html       # Full front-end app (HTML + CSS + JS)
```

---

## Prerequisites

- **Node.js**: v16+ recommended
- A **Google Gemini API Key** from  
  https://aistudio.google.com/app/apikey

---

## Setup & Run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the server**

   ```bash
   npm start
   ```

3. **Open the app**

   Visit:

   ```text
   http://localhost:3000
   ```

---

## First-Time Configuration

### 1. Add your Gemini API key

The app uses the Gemini API from the browser to:

- Extract text from uploaded PDFs.
- Generate quizzes from SOP content.

Steps:

1. Open the app in your browser.
2. Click the **Settings** icon (top right).
3. Paste your **Gemini API key** into the modal.
4. Click **Save Key**.

The key is stored in `localStorage` under:

```text
sop_gemini_api_key
```

No backend storage. If you clear browser data, you’ll need to re-enter it.

---

## Using the App

### Manager flow

1. **Log in**

   - Email: `manager@company.com`
   - No password (this is a demo app; add auth if you deploy it seriously).

2. **Add employees**

   - Go to **Employees & Scores** tab.
   - Click **+ Add Employee**.
   - Enter **Name** and **Email**.
   - Employees will use that email to log in.

3. **Upload SOPs**

   - Go to **SOPs & Assignment** tab.
   - Click the upload card and select a `.pdf` or `.txt`.
   - The app:
     - Extracts text (Gemini for PDFs).
     - Calls Gemini again to generate a quiz.
   - On success, the SOP appears in the list with question count.

4. **Assign trainings**

   - On each SOP row, you’ll see a list of employees as pill buttons.
   - Click an employee’s name to toggle assignment on/off.
   - Their dashboard will show the assigned SOPs.

5. **Monitor progress**

   - Manager **Dashboard**:
     - Total SOPs
     - Employee count
     - Average completion rate
   - **Employees & Scores**:
     - Per-employee:
       - Points
       - Level
       - SOPs completed / assigned
       - Completion bar
       - Badges

### Employee flow

1. **Log in**

   - Use the email the manager registered (e.g., `jane@company.com`).
   - If the email doesn’t exist, login will fail.

2. **View dashboard**

   - See completion % and training assigned.
   - See points, level, and badges.

3. **Take quizzes**

   - For each assigned SOP, click **Start Training**.
   - Answer all questions.
   - Submit each answer and move to next.
   - You must get **every question correct** to pass:
     - Pass: earn points, mark training complete.
     - Fail: 0 points, SOP remains incomplete.

4. **Retakes**

   - Completed trainings can be retaken (for practice).
   - Points are only awarded the first time it’s completed (per SOP per user).

---

## Data & Persistence

The app stores state as:

- **Documents (SOPs):**
  - ID, title, content, upload date
  - Quiz (`questions[]`, `options[]`, `correctIndex`)
  - `assignedTo` list (employee emails)

- **Employees:**
  - ID, name, email
  - `points`
  - `level`
  - `completedTrainings` (array of doc IDs)
  - `badges` (`bronze`, `silver`, `gold`)

Saved via:

```js
storage.set('sop-documents', JSON.stringify(documents));
storage.set('sop-employees', JSON.stringify(employees));
```

If no custom storage is provided, it falls back to `localStorage`.

---

## Common Issues / Troubleshooting

### 1. “Upload Failed” or “Quiz Error”

Likely causes:

- Missing or invalid **API key**.
- Gemini service is overloaded or returning `503`.
- Gemini response not in valid JSON (prompt/schema constraints).

What to do:

- Re-open **Settings** and confirm the API key.
- Try again with a simpler or shorter SOP.
- If you see `503` in the console, wait and try later.

### 2. No quiz generated / “Quiz Missing”

- Gemini might have returned an invalid or partial response.
- The app validates:
  - Exactly 4 options per question.
  - `correctIndex` is 0–3.
- If fewer than 3 valid questions survive validation, quiz is rejected.

Fix:

- Re-upload the SOP (or edit/shorten the text).
- Check the browser console for detailed error output.

### 3. Employee can’t log in

- Their email must match exactly the one the manager created.
- Manager must add them in **Employees & Scores** first.

---

## Customization Ideas

If you want to extend this:

- Add proper **authentication** (passwords or SSO).
- Move storage to a real database instead of `localStorage`.
- Add **categories** for SOPs (department, role).
- Add **due dates** and overdue indicators.
- Export completion data as CSV.

---

## License

Internal / educational use. Adapt as needed for your org.
