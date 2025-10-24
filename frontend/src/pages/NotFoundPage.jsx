import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-gray-600 mb-8">
          Die angeforderte Seite existiert leider nicht.
        </p>
        <Link 
          to="/" 
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;