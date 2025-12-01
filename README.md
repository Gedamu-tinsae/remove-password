# PDF Password Manager

A web application that manages passwords for PDF files using a FastAPI backend and React frontend.

## Features

- Secure password-removal for PDF files
- Secure password-addition for PDF files
- Web-based interface for easy use
- RESTful API backend built with FastAPI
- Modern React frontend
- Cross-platform compatibility
- Toggle between unlock and lock operations
- Password confirmation for enhanced security
- Responsive design

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
├── scripts/                   # Utility scripts
│   └── find_large_files.py    # Script to find files with >200 lines
├── TODO.md                    # Feature roadmap
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

For backend setup, API documentation, and running instructions, see [backend/README.md](backend/README.md).

### 3. Frontend Setup

For frontend setup and usage instructions, see [frontend/README.md](frontend/README.md).

## Running the Application

### 1. Start Backend Server

See instructions in [backend/README.md](backend/README.md).

The backend server runs on: `http://localhost:8000`

### 2. Start Frontend Server

See instructions in [frontend/README.md](frontend/README.md).

The frontend server runs on: `http://localhost:5173`

### 3. Using the Application

Using instructions are available in [frontend/README.md](frontend/README.md).

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