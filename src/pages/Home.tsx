import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, List, Calendar, Filter, Search } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <CheckSquare className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to TaskMaster
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal task management solution. Stay organized, focused, and productive
            with our intuitive task management system.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/auth"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <List className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Task Organization
            </h3>
            <p className="text-gray-600">
              Create, manage, and organize your tasks with ease. Keep everything in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Calendar className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Deadline Tracking
            </h3>
            <p className="text-gray-600">
              Set deadlines and never miss important dates. Stay on top of your schedule.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Filter className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Priority Filters
            </h3>
            <p className="text-gray-600">
              Prioritize tasks and filter them based on importance and urgency.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Search className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Smart Search
            </h3>
            <p className="text-gray-600">
              Quickly find tasks with our powerful search functionality.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users who are already managing their tasks effectively.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}