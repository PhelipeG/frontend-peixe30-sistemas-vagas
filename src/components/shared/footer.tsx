"use client";

import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 shadow-2xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Logo e descrição */}
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                Peixe 30
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              Gerenciamento de vagas - teste tecnico Fullstack
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
