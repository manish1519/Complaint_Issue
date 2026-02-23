'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Bell, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavbarProps {
  userRole?: 'user' | 'admin';
  userName?: string;
  onLogout?: () => void;
}

export function Navbar({ userRole = 'user', userName = 'User', onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isAdmin = userRole === 'admin';

  return (
    <nav className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <Link href={isAdmin ? '/admin' : '/dashboard'} className="font-bold text-lg text-foreground">
              Complaint Manager
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {isAdmin ? (
              <>
                <Link href="/admin" className="text-foreground hover:text-primary transition-colors hover-lift">
                  Dashboard
                </Link>
                <Link href="/admin/complaints" className="text-foreground hover:text-primary transition-colors hover-lift">
                  All Complaints
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors hover-lift">
                  Dashboard
                </Link>
                <Link href="/complaint/new" className="text-foreground hover:text-primary transition-colors hover-lift">
                  New Complaint
                </Link>
                <Link href="/complaints" className="text-foreground hover:text-primary transition-colors hover-lift">
                  My Complaints
                </Link>
              </>
            )}

            {/* User Info & Actions */}
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-secondary rounded-lg transition-all duration-200 hover:scale-110 relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 text-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 glass rounded-lg shadow-xl border border-border z-50 animate-slide-in">
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-3">Notifications</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-status-resolved/10 border border-status-resolved/20 rounded-lg">
                          <p className="text-sm font-medium text-status-resolved">Complaint CMP-001 resolved</p>
                          <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                        <div className="p-3 bg-status-in-progress/10 border border-status-in-progress/20 rounded-lg">
                          <p className="text-sm font-medium text-status-in-progress">New complaint assigned</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* User Info */}
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              
              {/* Logout */}
              <button
                onClick={onLogout}
                className="p-2 hover:bg-secondary rounded-lg transition-all duration-200 hover:scale-110 hover-glow"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-3 pt-4">
              {isAdmin ? (
                <>
                  <Link href="/admin" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/admin/complaints" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    All Complaints
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/complaint/new" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    New Complaint
                  </Link>
                  <Link href="/complaints" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    My Complaints
                  </Link>
                </>
              )}
              <button
                onClick={onLogout}
                className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors text-left flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
