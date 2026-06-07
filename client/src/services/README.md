# Mini Expense Tracker

A full-stack expense tracking application built with Node.js/Express and React. Users can log daily expenses across categories, view summaries, and visualise spending with charts.

## Live Demo

- **Frontend:** https://mini-expense-tracker-green.vercel.app
- **Backend:** https://mini-expense-tracker-api-2ubk.onrender.com

> Note: The backend is hosted on Render's free tier and may take 50+ seconds to wake up after inactivity.

## Tech Stack

- **Backend:** Node.js, Express, UUID — chosen for simplicity and fast setup
- **Frontend:** React (Vite), Tailwind CSS, Recharts — Vite for fast dev experience, Tailwind for utility styling, Recharts for charts
- **Storage:** JSON file persistence — simple and sufficient for this scope
- **Deployment:** Vercel (frontend), Render (backend)

## How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Div776/mini-expense-tracker.git
cd mini-expense-tracker

# Start the backend
cd server
npm install
node index.js

# In a new terminal, start the frontend
cd client
npm install
npm run dev
```

Then open http://localhost:5173

## API Documentation

| Method | Path | Body | Description |
|--------|------|------|-------------|
| GET | /api/expenses | — | Get all expenses (supports ?category=&from=&to=) |
| POST | /api/expenses | { amount, category, date, note } | Create expense |
| PUT | /api/expenses/:id | { amount, category, date, note } | Update expense |
| DELETE | /api/expenses/:id | — | Delete expense |
| GET | /api/expenses/summary | — | Get total, per category, highest expense |

## Project Structure
## Next Steps

- Add authentication so multiple users can track their own expenses
- Replace JSON file storage with a proper database (PostgreSQL or MongoDB)
- Add CSV export for visible expenses
- Add budget limits per category with visual alerts
- Write backend tests with Jest