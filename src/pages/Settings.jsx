import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const SettingsPage = () => {
  // Настраиваемые данные пользователя
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    avatar: 'JD' // инициалы для аватара
  });

  const [activeTab, setActiveTab] = useState('Profile');

  // Список разделов настроек
  const settingSections = [
    { id: 'Profile', label: 'Profile', active: true },
    { id: 'Notifications', label: 'Notifications', active: false },
    { id: 'Account', label: 'Account', active: false }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    console.log('Profile updated:', userProfile);
    // Здесь можно добавить логику сохранения
  };

  const handlePhotoChange = () => {
    console.log('Change photo clicked');
    // Здесь можно добавить логику изменения фото
  };

  const renderProfileContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Profile Settings</h2>
      
      {/* Avatar Section */}
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold mr-4">
          {userProfile.avatar}
        </div>
        <button 
          onClick={handlePhotoChange}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          Change Photo
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={userProfile.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            value={userProfile.emailAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={userProfile.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderNotificationsContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
      <p className="text-gray-600">Notification settings will be implemented here.</p>
    </div>
  );

  const renderAccountContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
      <p className="text-gray-600">Account settings will be implemented here.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return renderProfileContent();
      case 'Notifications':
        return renderNotificationsContent();
      case 'Account':
        return renderAccountContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-[60px]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === section.id
                      ? 'bg-blue-500 text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;