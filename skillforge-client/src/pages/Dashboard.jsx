import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Dashboard</h1>
        <p className="text-center text-gray-700 mb-4">Welcome, <span className="font-semibold">{user?.username}</span>!</p>
        <p className="text-center text-gray-600 mb-8">Your role: <span className="text-blue-500">{user?.role}</span></p>
        <button
          onClick={logout}
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
