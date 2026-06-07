import './Porridge.css';
import { Link } from 'react-router-dom';
import { porridgeData } from '../data/porridgeData';
import { ArrowLeft, Clock, Users, ChefHat, Flame } from 'lucide-react';

function Porridge() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-amber-100 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            На главную
          </Link>
          <h1 className="text-4xl font-bold mb-2">Каши</h1>
          <p className="text-amber-100">Традиционные русские каши — основа здорового питания</p>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {porridgeData.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-56 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/og-fallback.jpg';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{recipe.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-amber-600" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-amber-600" />
                    <span>{recipe.servings} порции</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat size={16} className="text-amber-600" />
                    <span>{recipe.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame size={16} className="text-amber-600" />
                    <span>{recipe.calories}</span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all">
                  Смотреть рецепт
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Porridge;