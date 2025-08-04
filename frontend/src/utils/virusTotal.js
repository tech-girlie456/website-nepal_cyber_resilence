import axios from 'axios';

// Note: In a production environment, this API key should be stored in an environment variable
const VIRUS_TOTAL_API_KEY = '8031be61951d738da8e9f10b9bab823e9e24e7582d768b78753bc96a93859867';
const API_BASE_URL = 'https://www.virustotal.com/api/v3';

const virusTotalApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-apikey': VIRUS_TOTAL_API_KEY,
    'Content-Type': 'application/json'
  }
});

/**
 * Uploads a file to VirusTotal for scanning
 * @param {File} file - The file to scan
 * @returns {Promise<Object>} - The scan response
 */
export const scanFile = async (file) => {
  try {
    // First, get the upload URL
    const uploadUrlResponse = await virusTotalApi.get('/files/upload_url');
    const uploadUrl = uploadUrlResponse.data.data;

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);

    // Upload the file for scanning
    const uploadResponse = await axios.post(uploadUrl, formData, {
      headers: {
        'x-apikey': VIRUS_TOTAL_API_KEY,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress: ${progress}%`);
      }
    });

    return uploadResponse.data;
  } catch (error) {
    console.error('VirusTotal scan error:', error);
    throw new Error('Failed to scan file with VirusTotal');
  }
};

/**
 * Gets the analysis report for a file
 * @param {string} analysisId - The analysis ID from the scan response
 * @returns {Promise<Object>} - The analysis report
 */
export const getAnalysisReport = async (analysisId) => {
  try {
    const response = await virusTotalApi.get(`/analyses/${analysisId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting analysis report:', error);
    throw new Error('Failed to get analysis report');
  }
};

/**
 * Polls for the analysis report until it's complete
 * @param {string} analysisId - The analysis ID from the scan response
 * @param {number} [interval=5000] - Polling interval in milliseconds
 * @param {number} [timeout=300000] - Maximum time to wait in milliseconds (5 minutes)
 * @returns {Promise<Object>} - The final analysis report
 */
export const pollAnalysisReport = async (analysisId, interval = 5000, timeout = 300000) => {
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const checkReport = async () => {
      try {
        const report = await getAnalysisReport(analysisId);
        const status = report.data.attributes.status;
        
        if (status === 'completed') {
          resolve(report);
        } else if (status === 'queued' || status === 'in-progress') {
          if (Date.now() - startTime >= timeout) {
            reject(new Error('Analysis timed out'));
          } else {
            setTimeout(checkReport, interval);
          }
        } else {
          reject(new Error(`Analysis failed with status: ${status}`));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    checkReport();
  });
};

/**
 * Checks if a file is malicious based on the VirusTotal report
 * @param {Object} report - The analysis report from VirusTotal
 * @returns {Object} - Object containing isMalicious flag and details
 */
export const isFileMalicious = (report) => {
  const stats = report.data.attributes.stats;
  const totalEngines = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const maliciousCount = stats.malicious || 0;
  
  return {
    isMalicious: maliciousCount > 0,
    maliciousCount,
    totalEngines,
    stats
  };
};
