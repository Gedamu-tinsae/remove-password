# PDF Password Manager - Backend

The backend is a FastAPI application that provides the core PDF processing functionality.

## Features

- Secure password-removal for PDF files
- Secure password-addition for PDF files
- RESTful API endpoints
- Cross-platform compatibility
- Proper error handling and validation
- Command-line PDF unlocker in app.py
- Test suite for API functionality

## Project Structure

```
backend/
├── app.py                 # Command-line PDF unlocker
├── main.py                # FastAPI web server
├── requirements.txt       # Python dependencies
└── tests/                 # Backend test files
    ├── bank_statement.pdf # Sample test PDF
    ├── test_api.py        # API test script
    └── unlocked.pdf       # Sample output PDF
```

## API Documentation

The backend provides two main endpoints:

### Unlock Endpoint (`/api/unlock`)
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

### Lock Endpoint (`/api/lock`)
- **Method**: POST
- **Form Data**:
  - `file`: The PDF file to lock
  - `password`: The password to apply to the PDF
- **Response**: The locked PDF file as a download

Example using curl:
```bash
curl -X POST http://localhost:8000/api/lock \
  -F "file=@unlocked.pdf" \
  -F "password=new_password"
```

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
On Windows:
```bash
venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Backend Server

From the backend directory:
```bash
python main.py
```

The backend server runs on: `http://localhost:8000`

## Security Practices

- Passwords are not stored or logged
- Environment variables are used for sensitive configuration
- Input validation is performed on file uploads
- Temporary files are securely handled

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