# PDF Password Manager - Frontend

The frontend is a React application that provides the user interface for the PDF password manager.

## Features

- Modern React frontend
- Toggle between unlock and lock operations
- Password confirmation for enhanced security
- Drag & drop file upload
- Responsive design
- Cross-platform compatibility

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── styles/         # Modularized CSS files
│       ├── base.css
│       ├── animations.css
│       ├── layout.css
│       └── components.css
├── package.json
├── package-lock.json
└── ...
```

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Frontend Server

From the frontend directory:
```bash
npm run dev
```

The frontend server runs on: `http://localhost:5173`

## Using the Application

The application now supports both PDF unlocking and locking:

### Unlocking a PDF:
1. Open your browser to `http://localhost:5173`
2. Select "Unlock" mode using the toggle button
3. Drag & drop your locked PDF or click to browse
4. Enter the PDF password
5. Click "Unlock & Download"
6. The unlocked PDF will download automatically

### Locking a PDF:
1. Open your browser to `http://localhost:5173`
2. Select "Lock" mode using the toggle button
3. Drag & drop your PDF or click to browse
4. Enter the new password
5. Confirm the password
6. Click "Lock & Download"
7. The locked PDF will download automatically

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

## Troubleshooting

- If you encounter import errors, ensure you're using the virtual environment in the backend directory
- Make sure both servers are running when using the web interface
- Check that the ports (8000 for backend, 5173 for frontend) are available

## Security Practices

- Passwords are not stored or logged in the frontend
- Communication with the backend is secured through HTTPS in production
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