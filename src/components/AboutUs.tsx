import React from 'react';
import { Users, Target, Award, Sparkles, Heart, Shield, Clock, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: <Heart className="h-8 w-8 text-sage" />,
    title: "Respect",
    description: "Nous accordons une importance capitale au respect mutuel, à l'écoute active et à la considération des besoins de chaque client."
  },
  {
    icon: <Shield className="h-8 w-8 text-sage" />,
    title: "Intégrité",
    description: "Notre engagement envers l'honnêteté et la transparence guide chacune de nos actions et décisions professionnelles."
  },
  {
    icon: <Award className="h-8 w-8 text-sage" />,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque projet, en maintenant des standards élevés de qualité et de professionnalisme."
  },
  {
    icon: <Clock className="h-8 w-8 text-sage" />,
    title: "Ponctualité",
    description: "Le respect des délais est une priorité absolue, reflétant notre engagement envers la satisfaction client."
  },
  {
    icon: <Users className="h-8 w-8 text-sage" />,
    title: "Esprit d'équipe",
    description: "La collaboration et la synergie entre nos équipes sont les clés de notre réussite collective."
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-sage" />,
    title: "Innovation",
    description: "Nous encourageons l'innovation et l'adoption de solutions modernes pour optimiser nos services."
  },
  {
    icon: <Target className="h-8 w-8 text-sage" />,
    title: "Performance",
    description: "Notre objectif est d'atteindre les meilleurs résultats possibles dans chaque aspect de notre travail."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-sage" />,
    title: "Qualité",
    description: "La qualité est au cœur de notre approche, depuis la sélection des matériaux jusqu'à la finition des projets."
  }
];

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Qui Sommes-Nous ?</h2>
          <p className="section-subtitle">
            BATIMO est une entreprise spécialisée dans la construction et la gestion immobilière, 
            fondée sur des valeurs d'excellence et d'innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="L'équipe BATIMO"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-sage/10 rounded-2xl -z-10"></div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-montserrat font-bold text-gray-900">
              Notre Histoire
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Fondée en 2023, BATIMO est née de la vision d'entrepreneurs passionnés 
              par l'immobilier et la construction. Notre objectif est de révolutionner 
              le secteur en apportant des solutions innovantes et durables.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nous nous distinguons par notre approche moderne de la construction et 
              de la gestion immobilière, en mettant l'accent sur la qualité, 
              l'innovation et la satisfaction client.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-sage">50+</p>
                  <p className="text-sm text-gray-600">Projets Réalisés</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-sage">100%</p>
                  <p className="text-sm text-gray-600">Clients Satisfaits</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-sage">15+</p>
                  <p className="text-sm text-gray-600">Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-montserrat font-bold text-gray-900 mb-4">
            Nos Valeurs
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nos valeurs fondamentales guident chacune de nos actions et reflètent notre 
            engagement envers l'excellence, l'intégrité et la satisfaction client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-sage/30 group"
            >
              <div className="h-12 w-12 rounded-lg bg-sage/10 flex items-center justify-center mb-4 group-hover:bg-sage/20 transition-colors">
                {value.icon}
              </div>
              <h4 className="text-xl font-montserrat font-semibold text-gray-900 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;