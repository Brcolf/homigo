import React, { useState } from 'react';
import axios from 'axios';

function DocumentVault() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return;
    const { data } = await axios.post('/api/vault/sign', {
      fileName: file.name,
      fileType: file.type
    });
    await axios.put(data.signedUrl, file, {
      headers: { 'Content-Type': file.type }
    });
    setUploaded(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Document Vault</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
      </form>
      {uploaded && <p className="mt-4 text-green-600">✅ File uploaded successfully</p>}
    </div>
  );
}

export default DocumentVault;