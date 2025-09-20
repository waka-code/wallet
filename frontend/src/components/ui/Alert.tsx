import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  className = ''
}) => {
  const styles = {
    success: {
      container: 'bg-success-50 border-success-200 text-success-800',
      icon: <CheckCircle className="h-5 w-5 text-success-500" />,
    },
    error: {
      container: 'bg-error-50 border-error-200 text-error-800',
      icon: <XCircle className="h-5 w-5 text-error-500" />,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`border rounded-md p-4 ${currentStyle.container} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {currentStyle.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          <p className="text-sm">
            {message}
          </p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
