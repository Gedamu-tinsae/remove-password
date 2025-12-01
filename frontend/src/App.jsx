import { useState } from 'react';
import './styles/base.css';
import './styles/animations.css';
import './styles/layout.css';
import './styles/components.css';

function App() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [operation, setOperation] = useState('unlock'); // 'unlock' or 'lock'

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setStatus('');
      } else {
        setStatus('Please upload a PDF file');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setStatus('');
      } else {
        setStatus('Please upload a PDF file');
      }
    }
  };

  const handleOperation = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('Please select a PDF file');
      return;
    }

    if (!password) {
      setStatus('Please enter a password');
      return;
    }

    if (operation === 'lock' && password !== confirmPassword) {
      setStatus('Passwords do not match');
      return;
    }

    setLoading(true);
    setStatus(operation === 'unlock' ? 'Unlocking PDF...' : 'Locking PDF...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    try {
      const apiUrl = operation === 'unlock' ? 'http://localhost:8000/api/unlock' : 'http://localhost:8000/api/lock';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `Failed to ${operation} PDF`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      let downloadName = operation === 'unlock' ? `unlocked_${file.name}` : `locked_${file.name}`;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus(`PDF ${operation}ed successfully! Download started.`);
      setFile(null);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="icon">{operation === 'unlock' ? '🔓' : '🔒'}</div>
          <h1>{operation === 'unlock' ? 'PDF Unlocker' : 'PDF Locker'}</h1>
          <p>
            {operation === 'unlock' 
              ? 'Remove password protection from your PDF files' 
              : 'Add password protection to your PDF files'}
          </p>
          
          {/* Operation toggle */}
          <div className="operation-toggle">
            <button 
              className={`toggle-btn ${operation === 'unlock' ? 'active' : ''}`}
              onClick={() => setOperation('unlock')}
            >
              Unlock
            </button>
            <button 
              className={`toggle-btn ${operation === 'lock' ? 'active' : ''}`}
              onClick={() => setOperation('lock')}
            >
              Lock
            </button>
          </div>
        </div>

        <form onSubmit={handleOperation} className="form">
          <div
            className={`upload-zone ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {file ? (
              <div className="file-info">
                <div className="file-icon">📄</div>
                <div className="file-name">{file.name}</div>
                <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
              </div>
            ) : (
              <div className="upload-prompt">
                <div className="upload-icon">📁</div>
                <p>Drag & drop your PDF here</p>
                <span>or click to browse</span>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">{operation === 'unlock' ? 'Current Password' : 'New Password'}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={operation === 'unlock' ? 'Enter current password' : 'Enter new password'}
              disabled={loading}
            />
          </div>

          {operation === 'lock' && (
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={loading}
              />
            </div>
          )}

          <button type="submit" disabled={loading || !file || !password || (operation === 'lock' && password !== confirmPassword)} className="unlock-btn">
            {loading ? (
              <>
                <span className="spinner"></span>
                {operation === 'unlock' ? 'Unlocking...' : 'Locking...'}
              </>
            ) : (
              <>
                <span>{operation === 'unlock' ? '🔓' : '🔒'}</span>
                {operation === 'unlock' ? 'Unlock & Download' : 'Lock & Download'}
              </>
            )}
          </button>

          {status && (
            <div className={`status ${status.includes('Error') || status.includes('Please') || status.includes('match') ? 'error' : 'success'}`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;