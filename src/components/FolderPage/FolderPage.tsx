import React from 'react';

const FolderPage: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://testsmtp00001-folder-wagc.bolt.host"
        title="Embedded Content"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default FolderPage;