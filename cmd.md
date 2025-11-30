# PDF Unlocker - Quick Start Commands

## Initial Setup (First Time Only)

### 1. Create Virtual Environment
```bash
python -m venv venv
```

### 2. Install Python Dependencies
```bash
venv\Scripts\pip install -r requirements.txt
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

---

## Running the Application

### Start Backend Server (Terminal 1)
```bash
venv\Scripts\python main.py
```
Backend runs on: `http://localhost:8000`

### Start Frontend Server (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## Using the App

1. Open browser to `http://localhost:5173`
2. Drag & drop your locked PDF or click to browse
3. Enter the PDF password
4. Click "Unlock & Download"
5. The unlocked PDF will download automatically

---

## Stopping the Servers

Press `Ctrl+C` in each terminal window to stop the servers.
