import { Heart, ShieldCheck, Truck } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-royal-green-900 mb-6">À Propos de TenueDyali</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes passionnés par le football, la fierté des équipes et l'unicité de chaque supporter. Notre mission est de vous offrir les meilleurs maillots avec une personnalisation de qualité professionnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img src="https://images.unsplash.com/photo-1518605368461-1e1c98867aed?q=80&w=1000&auto=format&fit=crop" alt="Passion pour le foot" className="rounded-3xl shadow-xl w-full object-cover h-96" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire, Votre Passion</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Née au cœur du Maroc, TenueDyali a été fondée avec une idée simple : permettre à tous les de supporters de porter un maillot qui leur ressemble, floqué avec une précision au millimètre.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nous sélectionnons minutieusement nos tissus pour vous garantir un confort optimal pendant l'effort, et nos techniques de flocage sont conçues pour résister aux tacles les plus agressifs et aux nombreuses machines à laver !
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition duration-300">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="text-royal-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Qualité Premium</h3>
            <p className="text-gray-600">Nos maillots sont certifiés et testés pour garantir la meilleure durabilité saison après saison.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition duration-300">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Heart className="text-royal-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Flocage sur mesure</h3>
            <p className="text-gray-600">Nom, numéro, couleurs... Personnalisez intégralement l'arrière de votre maillot et rendez-le vraiment unique.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition duration-300">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Truck className="text-royal-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Livraison Rapide</h3>
            <p className="text-gray-600">Nous expédions nos maillots personnalisés en un temps record partout au Maroc et à l'international.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
