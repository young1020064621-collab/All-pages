import React, { useState, useCallback } from 'react';
import Toast from './Toast';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'alert' | 'fail' | 'info';
  duration?: number;
}

interface ToastManagerProps {
  toasts: ToastData[];
  onRemoveToast: (id: string) => void;
}

const ToastManager: React.FC<ToastManagerProps> = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed top-20 right-4 z-[99999] space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="transform transition-all duration-300 ease-in-out"
          style={{
            transform: `translateY(${index * 10}px)`,
            zIndex: 50 - index
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemoveToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastManager;