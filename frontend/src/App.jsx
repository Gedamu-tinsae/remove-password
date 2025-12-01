import { useState } from 'react';
import './styles/base.css';
import './styles/animations.css';
import './styles/layout.css';
import './styles/components.css';

function App() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  const handleUnlock = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('Please select a PDF file');
      return;
    }

    if (!password) {
      setStatus('Please enter a password');
      return;
    }

    setLoading(true);
    setStatus('Unlocking PDF...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/api/unlock', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to unlock PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `unlocked_${file.name}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus('PDF unlocked successfully! Download started.');
      setFile(null);
      setPassword('');
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
          <div className="icon">🔓</div>
          <h1>PDF Unlocker</h1>
          <p>Remove password protection from your PDF files</p>
        </div>

        <form onSubmit={handleUnlock} className="form">
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PDF password"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading || !file || !password} className="unlock-btn">
            {loading ? (
              <>
                <span className="spinner"></span>
                Unlocking...
              </>
            ) : (
              <>
                <span>🔓</span>
                Unlock & Download
              </>
            )}
          </button>

          {status && (
            <div className={`status ${status.includes('Error') || status.includes('Please') ? 'error' : 'success'}`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
