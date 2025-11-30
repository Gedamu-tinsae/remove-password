# PDF Password Remover

A web application that removes passwords from PDF files using a FastAPI backend and React frontend.

## Features

- Secure password-removal for PDF files
- Web-based interface for easy use
- RESTful API backend built with FastAPI
- Modern React frontend
- Cross-platform compatibility

## Project Structure

```
remove password/
├── backend/
│   ├── app.py                 # Command-line PDF unlocker
│   ├── main.py                # FastAPI web server
│   ├── requirements.txt       # Python dependencies
│   └── tests/                 # Backend test files
│       ├── bank_statement.pdf # Sample test PDF
│       ├── test_api.py        # API test script
│       └── unlocked.pdf       # Sample output PDF
├── frontend/                  # React frontend application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md                  # This file
└── .gitignore
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn package manager

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd remove password
```

### 2. Backend Setup

Navigate to the backend directory and set up Python virtual environment:

```bash
cd backend
python -m venv venv
```

On Windows:
```bash
venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Frontend Setup

From the project root directory:

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start Backend Server

From the project root directory:

```bash
cd backend
venv\Scripts\activate  # On Windows
# or source venv/bin/activate # On macOS/Linux
python main.py
```

The backend server runs on: `http://localhost:8000`

### 2. Start Frontend Server

Open a new terminal, navigate to the frontend directory and run:

```bash
cd frontend
npm run dev
```

The frontend server runs on: `http://localhost:5173`

### 3. Using the Application

1. Open your browser to `http://localhost:5173`
2. Drag & drop your locked PDF or click to browse
3. Enter the PDF password
4. Click "Unlock & Download"
5. The unlocked PDF will download automatically

## API Documentation

The backend provides a `/api/unlock` endpoint that accepts:
- **Method**: POST
- **Form Data**:
  - `file`: The PDF file to unlock
  - `password`: The password for the PDF
- **Response**: The unlocked PDF file as a download

Example using curl:
```bash
curl -X POST http://localhost:8000/api/unlock \
  -F "file=@locked.pdf" \
  -F "password=your_password"
```

## Testing

The application includes backend tests in the `backend/tests/` directory:

- `test_api.py`: Test script for the API functionality
- Sample PDF files for testing

To run the test:
```bash
cd backend/tests
python test_api.py
```

Note: The test API script uses environment variables for passwords. Set `TEST_PDF_PASSWORD` in a `.env` file or environment.

## Stopping the Servers

Press `Ctrl+C` in each terminal window to stop the respective servers.

## Security Practices

- Passwords are not stored or logged
- Environment variables are used for sensitive configuration
- Input validation is performed on file uploads
- The `.env` file is properly ignored by Git

## Troubleshooting

- If you encounter import errors, ensure you're using the virtual environment in the backend directory
- Make sure both servers are running when using the web interface
- Check that the ports (8000 for backend, 5173 for frontend) are available

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.