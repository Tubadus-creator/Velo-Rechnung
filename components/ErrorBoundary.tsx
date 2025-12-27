import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    // Clear potentially corrupted local storage
    localStorage.removeItem('velo_user');
    localStorage.removeItem('velo_token');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-slate-700">
            <div className="bg-red-50 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-velo-dark dark:text-white mb-2">Uups, da ist was schiefgelaufen.</h1>
            <p className="text-gray-500 dark:text-slate-400 mb-6">
              Die Anwendung ist auf einen unerwarteten Fehler gestoßen.
            </p>
            
            <div className="bg-gray-100 dark:bg-slate-900 p-4 rounded-lg mb-6 text-left overflow-auto max-h-32">
                <p className="font-mono text-xs text-red-600 dark:text-red-400 break-all">
                    {this.state.error?.message || "Unknown Error"}
                </p>
            </div>

            <Button onClick={this.handleReset} fullWidth>
              <RefreshCw className="w-4 h-4 mr-2" />
              App neu laden & Cache leeren
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;