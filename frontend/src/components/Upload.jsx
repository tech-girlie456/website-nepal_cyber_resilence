import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUpload, 
  FiX, 
  FiTrash2, 
  FiDownload, 
  FiAlertCircle, 
  FiCheckCircle,
  FiFile,
  FiImage,
  FiFileText,
  FiArrowLeft
} from 'react-icons/fi';
import { UserContext } from '../context/UserContext';
import { fileApi } from '../utils/api';
import { toast } from 'react-toastify';
import { scanFile, pollAnalysisReport, isFileMalicious } from '../utils/virusTotal';
import './Upload.css';

// 50MB in bytes
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const acceptedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/x-rar-compressed'
  ];

  const fetchFiles = async () => {
    try {
      const response = await fileApi.getFiles();
      if (response && Array.isArray(response.data?.files)) {
        setFiles(response.data.files);
      } else if (response && Array.isArray(response.files)) {
        setFiles(response.files);
      } else if (Array.isArray(response)) {
        setFiles(response);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      setFiles([]);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;

    // Reset previous state
    setUploadProgress(0);
    
    // Validate file type
    if (selectedFile && !acceptedTypes.includes(selectedFile.type)) {
      toast.error('File type not supported');
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error(`File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    try {
      setIsScanning(true);
      setError('');
      setSuccess('Scanning file for malware...');
      
      // Step 1: Scan the file with VirusTotal
      const scanResponse = await scanFile(file);
      const analysisId = scanResponse.data.id;
      
      // Step 2: Poll for the analysis results
      const analysisReport = await pollAnalysisReport(analysisId);
      const { isMalicious, maliciousCount, totalEngines } = isFileMalicious(analysisReport);
      
      if (isMalicious) {
        setError(`⚠️ Malware Detected! ${maliciousCount} out of ${totalEngines} security engines flagged this file as malicious.`);
        toast.error('Malicious file detected!', {
          icon: <FiAlertCircle className="text-red-500" />
        });
        setScanResult({
          isMalicious: true,
          maliciousCount,
          totalEngines,
          fileName: file.name
        });
        return;
      }
      
      // If file is clean, proceed with upload
      setSuccess('File scanned and verified. No threats detected. Uploading...');
      
      const formData = new FormData();
      formData.append('file', file);
      
      setIsUploading(true);
      setUploadProgress(0);
      
      // Upload the file to our server
      await fileApi.uploadFile(
        formData, 
        (progress) => {
          setUploadProgress(progress);
        }
      );

      toast.success('File uploaded successfully!', {
        icon: <FiCheckCircle className="text-green-500" />
      });
      
      // Reset form
      setFile(null);
      setUploadProgress(0);
      setSuccess('File uploaded successfully!');
      setScanResult({
        isMalicious: false,
        fileName: file.name
      });
      
      // Refresh files list
      await fetchFiles();
      
    } catch (error) {
      console.error('Upload/Scan failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Upload/Scan failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage, {
        icon: <FiAlertCircle className="text-red-500" />
      });
    } finally {
      setIsUploading(false);
      setIsScanning(false);
    }
  };

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await fileApi.deleteFile(fileId);
        toast.success('File deleted successfully');
        await fetchFiles();
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete file');
      }
    }
  };

  const handleDownload = async (file) => {
    try {
      const blob = await fileApi.viewFile(file.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download file');
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchFiles();
    }
  }, [user?.email]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Please log in</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to upload files.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>Upload Files</h1>
        <p>Upload to check if a files is secure and not malicious with Nepal Cyber Resilience</p>
      </div>
      
      <div className="upload-box">
        {isScanning ? (
          <div className="text-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-blue-600">Scanning file for malware...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
          </div>
        ) : scanResult ? (
          <div className={`p-4 rounded-lg ${scanResult.isMalicious ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 h-5 w-5 ${scanResult.isMalicious ? 'text-red-500' : 'text-green-500'}`}>
                {scanResult.isMalicious ? <FiAlertCircle size={20} /> : <FiCheckCircle size={20} />}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${scanResult.isMalicious ? 'text-red-800' : 'text-green-800'}`}>
                  {scanResult.isMalicious 
                    ? `Malware Detected!` 
                    : 'No Threats Detected'}
                </h3>
                <div className="mt-1 text-sm text-gray-600">
                  {scanResult.isMalicious ? (
                    <p>{scanResult.maliciousCount} out of {scanResult.totalEngines} security engines flagged this file as malicious.</p>
                  ) : (
                    <p>Your file is safe to upload.</p>
                  )}
                </div>
                {scanResult.isMalicious && (
                  <div className="mt-4">
                    <p className="text-xs text-red-700">
                      For security reasons, we cannot accept potentially harmful files.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setScanResult(null)}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Scan another file
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <FiUpload size={48} />
            </div>
            <div className="upload-instructions">
              <p>Drag and drop files here, or click to browse</p>
              <small>Supports: JPG, PNG, PDF, DOC, XLS, ZIP (Max 50MB)</small>
            </div>
          </>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          id="file-upload"
          disabled={isUploading}
        />
        <label htmlFor="file-upload" className="upload-btn">
          Select Files
        </label>

        {file && (
          <div className="file-preview-container">
            <div className="file-details">
              <div className="file-icon-container">
                <FiFile className="file-icon" />
              </div>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
              </div>
              <button 
                className="remove-file-btn"
                onClick={() => setFile(null)}
                disabled={isUploading}
              >
                <FiX />
              </button>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="progress-text">{Math.round(uploadProgress)}% uploaded</div>
              </div>
            )}

            <div className="button-group">
              <button 
                className="cancel-btn"
                onClick={() => setFile(null)}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                className="upload-submit-btn"
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload File'}
              </button>
            </div>
          </div>
        )}

        {(error || success) && (
          <div className={`status-message ${error ? 'error' : 'success'}`}>
            <div className="status-icon">
              {error ? <FiAlertCircle /> : <FiCheckCircle />}
            </div>
            <div className="status-content">
              <p>{error || success}</p>
            </div>
          </div>
        )}
      </div>

      <div className="recent-uploads">
        <h2>Recent Uploads</h2>
        {files.length === 0 ? (
          <p className="empty-state">No files uploaded yet.</p>
        ) : (
          <div className="uploads-list">
            {files.map((file) => (
              <div key={file.id} className="upload-item">
                <div className="upload-item-info">
                  <FiFile className="upload-item-icon" />
                  <span className="upload-item-name">{file.name}</span>
                </div>
                <button 
                  onClick={() => handleDownload(file)}
                  className="upload-item-download"
                >
                  <FiDownload size={16} /> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;