import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { UserListView } from './components/UserListView';
import { CoursesView } from './components/CoursesView';
import { SchoolsView } from './components/SchoolsView';
import { AIAssistant } from './components/AIAssistant';
import { LoginView } from './components/LoginView';
import { DocumentationView } from './components/DocumentationView';
import { ProfileView } from './components/ProfileView';
import { AboutView } from './components/AboutView';
import { ExamsView } from './components/ExamsView';
import { MaterialsView } from './components/MaterialsView';
import { NewsView } from './components/NewsView';
import { ResultsView } from './components/ResultsView';
import { GradebookView } from './components/GradebookView';
import { ReportsView } from './components/ReportsView';
import { NavSection, AuthUser } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('iftu_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to load user session");
      }
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    localStorage.setItem('iftu_user', JSON.stringify(user));
    setActiveSection(NavSection.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('iftu_user');
  };

  const handleUpdateProfile = (updatedUser: AuthUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('iftu_user', JSON.stringify(updatedUser));
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
        <div className="w-12 h-12 border-4 border-[#0090C1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case NavSection.DASHBOARD:
        return <DashboardView onNavigate={setActiveSection} />;
      case NavSection.COURSES:
        return <CoursesView />;
      case NavSection.TEACHERS:
        return <UserListView role="Teacher" />;
      case NavSection.STUDENTS:
        return <UserListView role="Student" />;
      case NavSection.SCHOOLS:
        return <SchoolsView />;
      case NavSection.AI_ASSISTANT:
        return <AIAssistant />;
      case NavSection.DOCUMENTATION:
        return <DocumentationView onBack={() => setActiveSection(NavSection.DASHBOARD)} />;
      case NavSection.PROFILE:
        return <ProfileView user={currentUser} onUpdate={handleUpdateProfile} />;
      case NavSection.ABOUT:
        return <AboutView />;
      case NavSection.EXAMS:
        return <ExamsView user={currentUser} />;
      case NavSection.MATERIALS:
        return <MaterialsView user={currentUser} />;
      case NavSection.NEWS:
        return <NewsView user={currentUser} />;
      case NavSection.RESULTS:
        return <ResultsView user={currentUser} />;
      case NavSection.GRADEBOOK:
        return <GradebookView user={currentUser} />;
      case NavSection.REPORTS:
        return <ReportsView user={currentUser} />;
      default:
        return <DashboardView onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f7f9] overflow-hidden font-sans">
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        user={currentUser}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          user={currentUser} 
          onLogout={handleLogout} 
          onNavigate={setActiveSection} 
        />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;