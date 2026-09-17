import React, { useState } from 'react';
import DealerSchemesRow from '../../dashboard/dealers/components/DealerSchemesRow';
import SchemesRow from '../../dashboard/painters/components/SchemesRow';
import CreateSchemeModal from './CreateSchemeModal';
import { Plus } from 'lucide-react';

const AdminOffersAndSchemes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateScheme = (data) => {
    console.log("Submitting new scheme data: ", data);
    // TODO: Send data to backend here
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 relative">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white hover:bg-red-800 rounded-lg text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Scheme
        </button>
      </div>

      <div>
        <DealerSchemesRow />
      </div>
      <div className="w-full h-px bg-gray-100"></div>
      <div>
        <SchemesRow />
      </div>

      <CreateSchemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateScheme}
      />
    </div>
  );
};

export default AdminOffersAndSchemes;
