import React from 'react';
import { Users, UserCheck } from 'lucide-react';

interface NavigationProps {
  activeTab: 'buyer' | 'seller';
  onTabChange: (tab: 'buyer' | 'seller') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange('buyer')}
          className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'buyer'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Users className="h-5 w-5 mr-2" />
          Buyer
        </button>
        <button
          onClick={() => onTabChange('seller')}
          className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'seller'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <UserCheck className="h-5 w-5 mr-2" />
          Seller
        </button>
      </nav>
    </div>
  );
}