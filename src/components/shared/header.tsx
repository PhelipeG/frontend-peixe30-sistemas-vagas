"use client";

import { Briefcase, LogOut, Menu, User, Users, FileText } from "lucide-react";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";

import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isJobsPage = pathname.startsWith('/jobs');
  const isCandidatesPage = pathname.startsWith('/candidates');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/jobs"
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              Peixe 30
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-1">
              <Link
                href="/jobs"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isJobsPage
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Vagas
              </Link>
              <Link
                href="/candidates"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isCandidatesPage
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Candidatos
              </Link>
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <User className="w-4 h-4" />
              <span className="truncate max-w-32 lg:max-w-none">
                {user?.name || user?.email}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-3">
            <div className="flex flex-col space-y-3">
              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-1 px-2">
                <Link
                  href="/jobs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isJobsPage
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Vagas
                </Link>
                <Link
                  href="/candidates"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isCandidatesPage
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Candidatos
                </Link>
              </div>

              {/* Mobile User Info */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center space-x-2 text-sm text-gray-700 px-2 mb-3">
                  <User className="w-4 h-4" />
                  <span className="truncate">{user?.name || user?.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 justify-start w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
