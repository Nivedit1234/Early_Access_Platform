import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    try {
      // Request the presigned URL from the backend
      const response = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });

      const { url: presignedUrl } = await response.json();

      // Upload the file to the S3 bucket using the presigned URL
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (uploadResponse.ok) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Upload File</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-white bg-gray-800 border border-gray-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
        {uploadStatus && (
          <p className={`mt-4 text-center ${uploadStatus.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
