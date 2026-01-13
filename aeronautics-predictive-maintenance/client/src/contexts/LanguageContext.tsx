import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "header.home": "Home",
    "header.learning": "Learning Hub",
    "header.news": "News",
    "header.blogs": "Blogs",
    "header.community": "Community",
    "header.resources": "Resources",
    "header.about": "About",
    "header.signin": "Sign In",
    "header.join": "Join Community",

    // Home
    "home.hero.title": "Master Aircraft Maintenance Prediction & Aerospace Engineering",
    "home.hero.subtitle": "Learn, connect, and innovate with the global aerospace engineering community. Access comprehensive resources on predictive maintenance, AI applications, and industry insights.",
    "home.hero.explore": "Explore Learning Hub",
    "home.hero.community": "Join Community",
    "home.stats.courses": "Learning Courses",
    "home.stats.members": "Community Members",
    "home.stats.articles": "Articles & Blogs",
    "home.features.title": "Everything You Need",
    "home.features.subtitle": "A complete platform for aerospace engineering learning, industry insights, and professional networking.",
    "home.featured.title": "Featured Articles",
    "home.featured.subtitle": "Latest insights from aerospace engineering experts",
    "home.news.title": "Latest News",
    "home.news.subtitle": "Stay updated with aerospace industry developments",
    "home.cta.title": "Join the Aerospace Engineering Community",
    "home.cta.subtitle": "Connect with thousands of aerospace professionals, researchers, and enthusiasts. Share knowledge, collaborate on projects, and advance your career.",
    "home.cta.button": "Join Now",

    // Learning
    "learning.hero.title": "Learning Hub",
    "learning.hero.subtitle": "Master aerospace engineering, predictive maintenance, and AI applications through comprehensive, structured courses.",
    "learning.filter.category": "Category",
    "learning.filter.difficulty": "Difficulty Level",
    "learning.showing": "Showing",
    "learning.courses": "course",
    "learning.resources.title": "Additional Resources",
    "learning.resources.code": "Code Examples",
    "learning.resources.code.desc": "Access Python, MATLAB, and C++ code examples for predictive maintenance algorithms.",
    "learning.resources.datasets": "Datasets",
    "learning.resources.datasets.desc": "Download real-world aircraft maintenance datasets for your research and projects.",
    "learning.resources.docs": "Documentation",
    "learning.resources.docs.desc": "Comprehensive technical documentation and API references for aerospace tools.",

    // News
    "news.hero.title": "Aerospace News Hub",
    "news.hero.subtitle": "Stay updated with the latest developments in aerospace industry, research breakthroughs, and technological innovations.",
    "news.search": "Search news...",
    "news.filter.category": "Category",
    "news.featured": "Featured Stories",
    "news.latest": "Latest Updates",
    "news.newsletter.title": "Stay Updated",
    "news.newsletter.subtitle": "Subscribe to our newsletter to receive the latest aerospace news, research updates, and industry insights directly to your inbox.",
    "news.newsletter.placeholder": "Enter your email",
    "news.newsletter.button": "Subscribe",

    // Blogs
    "blogs.hero.title": "Expert Blogs",
    "blogs.hero.subtitle": "In-depth articles from aerospace engineering professionals and researchers.",
    "blogs.cta.title": "Share Your Expertise",
    "blogs.cta.subtitle": "Are you an aerospace engineering expert? We invite you to contribute your insights and knowledge to our community.",
    "blogs.cta.button": "Become a Contributor",
    "blogs.search": "Search blogs...",
    "blogs.filter.category": "Category",
    "blogs.featured": "Featured Articles",
    "blogs.latest": "Latest Articles",

    // Inspiring Professionals
    "header.professionals": "Inspiring Professionals",
    "professionals.hero.title": "Inspiring Aerospace Professionals",
    "professionals.hero.subtitle": "Meet the visionaries and innovators who shaped aerospace engineering and continue to inspire the next generation.",
    "professionals.filter.category": "Category",
    "professionals.filter.era": "Era",
    "professionals.showing": "Showing",
    "professionals.count": "professionals",
    "professionals.cta.title": "Be Part of the Future",
    "professionals.cta.subtitle": "These pioneers started their journeys with passion and determination. Your story could inspire the next generation of aerospace engineers.",
    "professionals.cta.button": "Start Your Journey",

    // Bachelor Orientation
    "header.orientation": "Bachelor's Guide",
    "orientation.hero.title": "Bachelor's Orientation Guide",
    "orientation.hero.subtitle": "Explore aerospace engineering specialties and programs in France and English-speaking countries. Find the perfect path for your career.",
    "orientation.filter.country": "Country",
    "orientation.filter.specialization": "Specialization",
    "orientation.showing": "Showing",
    "orientation.programs": "programs",
    "orientation.info.title": "Getting Started",
    "orientation.info.requirements.title": "Prerequisites",
    "orientation.info.requirements.desc": "Most aerospace engineering programs require strong backgrounds in mathematics, physics, and chemistry. Check specific program requirements for admission details.",
    "orientation.info.support.title": "Support and Guidance",
    "orientation.info.support.desc": "Our community is here to help. Connect with current students and professionals to learn about program experiences and career paths.",

    // Conferences
    "header.conferences": "Conferences & Webinars",
    "header.forum": "Forum",
    "header.certifications": "Certifications",
    "header.profile": "My Profile",
    "conferences.hero.title": "Aerospace Conferences & Webinars",
    "conferences.hero.subtitle": "Join leading aerospace conferences, webinars, and workshops. Connect with industry experts, researchers, and professionals from around the world.",
    "conferences.filter.type": "Event Type",
    "conferences.filter.format": "Format",
    "conferences.filter.category": "Category",
    "conferences.featured": "Featured Events",
    "conferences.all": "All Events",
    "conferences.cta.title": "Don't Miss Out",
    "conferences.cta.subtitle": "Register for upcoming aerospace conferences and webinars to stay connected with the latest developments in the industry.",
    "conferences.cta.button": "Browse All Events",

    // Community
    // User Profile
    "profile.joined": "Joined",
    "profile.editProfile": "Edit Profile",
    "profile.logout": "Logout",
    "profile.coursesCompleted": "Courses Completed",
    "profile.certificates": "Certificates",
    "profile.favorites": "Favorites",
    "profile.badges": "Badges",
    "profile.tab.dashboard": "Dashboard",
    "profile.tab.favorites": "Favorites",
    "profile.tab.badges": "Badges",
    "profile.tab.notifications": "Notifications",
    "profile.about": "About Me",
    "profile.preferences": "Preferences",
    "profile.emailNotifications": "Email Notifications",
    "profile.newCourses": "Notify me of new courses",
    "profile.eventReminders": "Event reminders",
    "profile.learningProgress": "Learning Progress",
    "profile.savedItems": "Saved Items",
    "profile.achievements": "Achievements",
    "profile.unlocked": "Unlocked",
    "profile.notificationSettings": "Notification Settings",
    "profile.newArticles": "New articles and blogs",
    "profile.communityUpdates": "Community updates",

    // Forum
    "forum.title": "Community Forum",
    "forum.subtitle": "Join discussions with aerospace engineers, researchers, and enthusiasts. Share knowledge, ask questions, and collaborate.",
    "forum.newThread": "Start New Discussion",
    "forum.searchPlaceholder": "Search discussions...",
    "forum.pinned": "Pinned",
    "forum.answered": "Answered",
    "forum.views": "views",
    "forum.replies": "replies",
    "forum.posts": "posts",
    "forum.noThreads": "No discussions found. Be the first to start one!",
    "forum.topContributors": "Top Contributors",
    "forum.rules": "Forum Rules",
    "forum.rule1": "Be respectful and professional",
    "forum.rule2": "Stay on topic",
    "forum.rule3": "Provide helpful and detailed answers",
    "forum.rule4": "No spam or self-promotion",

    // Certifications
    "certifications.hero.title": "Certifications & Achievements",
    "certifications.hero.subtitle": "Showcase your skills and accomplishments in aerospace engineering and predictive maintenance.",
    "certifications.certificates": "Certificates",
    "certifications.badges": "Badges Earned",
    "certifications.skillsLearned": "Skills Learned",
    "certifications.completion": "Completion Rate",
    "certifications.tab.certificates": "Certificates",
    "certifications.tab.badges": "Badges",
    "certifications.issuedBy": "Issued by",
    "certifications.credentialId": "Credential ID",
    "certifications.skillsGained": "Skills Gained",
    "certifications.verified": "Verified Credential",
    "certifications.viewCertificate": "View Certificate",
    "certifications.download": "Download",
    "certifications.share": "Share",
    "certifications.criteria": "Criteria",
    "certifications.earnedDate": "Earned Date",
    "certifications.shareBadge": "Share Badge",
    "certifications.certificatePreview": "Certificate Preview",
    "certifications.certificatePreviewText": "Your certificate will appear here",

    // Community
    "community.hero.subtitle": "Connect with thousands of aerospace engineers, researchers, and enthusiasts worldwide.",
    "community.forums": "Discussion Forums",
    "community.forums.desc": "Join active discussions on maintenance, AI, careers, and aerospace innovation.",
    "community.directory": "Member Directory",
    "community.directory.desc": "Find and connect with aerospace professionals and fellow enthusiasts.",
    "community.events": "Events & Webinars",
    "community.events.desc": "Attend virtual events, webinars, and networking sessions with industry experts.",
    "community.qa": "Expert Q&A",
    "community.qa.desc": "Ask questions and get answers from aerospace engineering experts.",
    "community.cta.title": "Join Our Community",
    "community.cta.subtitle": "Connect with aerospace professionals, share knowledge, collaborate on projects, and advance your career in the aerospace industry.",
    "community.cta.button": "Create Your Profile",

    // Resources
    "resources.hero.title": "Resources",
    "resources.hero.subtitle": "Access tools, code, datasets, and documentation for aerospace engineering projects.",
    "resources.projects.title": "Featured Open Source Projects",

    // About
    "about.hero.title": "About Us",
    "about.hero.subtitle": "Building the future of aerospace engineering through education, innovation, and community.",
    "about.mission.title": "Our Mission",
    "about.values.title": "Our Core Values",
    "about.values.innovation": "Innovation",
    "about.values.community": "Community",
    "about.values.excellence": "Excellence",
    "about.contact.title": "Get In Touch",
    "about.contact.subtitle": "Have questions, suggestions, or want to collaborate? We would love to hear from you.",
    "about.partners.title": "Our Partners",

    // Footer
    "footer.learning": "Learning",
    "footer.courses": "Courses & Tutorials",
    "footer.documentation": "Documentation",
    "footer.certifications": "Certifications",
    "footer.community": "Community",
    "footer.forums": "Forums",
    "footer.events": "Events",
    "footer.networking": "Networking",
    "footer.resources": "Resources",
    "footer.tools": "Tools & Software",
    "footer.datasets": "Datasets",
    "footer.papers": "Research Papers",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookies": "Cookie Policy",
    "footer.rights": "All rights reserved.",
  },
  fr: {
    // Header
    "header.home": "Accueil",
    "header.learning": "Hub d'Apprentissage",
    "header.news": "Actualités",
    "header.blogs": "Blogs",
    "header.community": "Communauté",
    "header.resources": "Ressources",
    "header.about": "À Propos",
    "header.signin": "Se Connecter",
    "header.join": "Rejoindre la Communauté",

    // Home
    "home.hero.title": "Maîtrisez la Prédiction de Maintenance Aéronautique et l'Ingénierie Aérospatiale",
    "home.hero.subtitle": "Apprenez, connectez-vous et innovez avec la communauté mondiale d'ingénierie aérospatiale. Accédez à des ressources complètes sur la maintenance prédictive, les applications d'IA et les perspectives industrielles.",
    "home.hero.explore": "Explorer le Hub d'Apprentissage",
    "home.hero.community": "Rejoindre la Communauté",
    "home.stats.courses": "Cours d'Apprentissage",
    "home.stats.members": "Membres de la Communauté",
    "home.stats.articles": "Articles et Blogs",
    "home.features.title": "Tout ce dont vous avez besoin",
    "home.features.subtitle": "Une plateforme complète pour l'apprentissage en ingénierie aérospatiale, les perspectives industrielles et le réseautage professionnel.",
    "home.featured.title": "Articles en Vedette",
    "home.featured.subtitle": "Les dernières perspectives d'experts en ingénierie aérospatiale",
    "home.news.title": "Dernières Actualités",
    "home.news.subtitle": "Restez à jour avec les développements de l'industrie aérospatiale",
    "home.cta.title": "Rejoignez la Communauté d'Ingénierie Aérospatiale",
    "home.cta.subtitle": "Connectez-vous avec des milliers de professionnels, chercheurs et passionnés de l'aérospatiale. Partagez des connaissances, collaborez sur des projets et avancez dans votre carrière.",
    "home.cta.button": "Rejoindre Maintenant",

    // Learning
    "learning.hero.title": "Hub d'Apprentissage",
    "learning.hero.subtitle": "Maîtrisez l'ingénierie aérospatiale, la maintenance prédictive et les applications d'IA grâce à des cours structurés et complets.",
    "learning.filter.category": "Catégorie",
    "learning.filter.difficulty": "Niveau de Difficulté",
    "learning.showing": "Affichage",
    "learning.courses": "cours",
    "learning.resources.title": "Ressources Supplémentaires",
    "learning.resources.code": "Exemples de Code",
    "learning.resources.code.desc": "Accédez à des exemples de code Python, MATLAB et C++ pour les algorithmes de maintenance prédictive.",
    "learning.resources.datasets": "Ensembles de Données",
    "learning.resources.datasets.desc": "Téléchargez des ensembles de données réels de maintenance d'aéronefs pour vos recherches et projets.",
    "learning.resources.docs": "Documentation",
    "learning.resources.docs.desc": "Documentation technique complète et références API pour les outils aérospatiaux.",

    // News
    "news.hero.title": "Hub d'Actualités Aérospatiales",
    "news.hero.subtitle": "Restez à jour avec les derniers développements de l'industrie aérospatiale, les percées en recherche et les innovations technologiques.",
    "news.search": "Rechercher les actualités...",
    "news.filter.category": "Catégorie",
    "news.featured": "Histoires en Vedette",
    "news.latest": "Dernières Mises à Jour",
    "news.newsletter.title": "Restez Informé",
    "news.newsletter.subtitle": "Abonnez-vous à notre infolettre pour recevoir les dernières actualités aérospatiales, mises à jour de recherche et perspectives industrielles directement dans votre boîte de réception.",
    "news.newsletter.placeholder": "Entrez votre email",
    "news.newsletter.button": "S'abonner",

    // Blogs
    "blogs.hero.title": "Blogs d'Experts",
    "blogs.hero.subtitle": "Articles approfondis de professionnels et chercheurs en ingénierie aérospatiale.",
    "blogs.cta.title": "Partagez Votre Expertise",
    "blogs.cta.subtitle": "Êtes-vous un expert en ingénierie aérospatiale ? Nous vous invitons à contribuer vos perspectives et connaissances à notre communauté.",
    "blogs.cta.button": "Devenir Contributeur",
    "blogs.search": "Rechercher les blogs...",
    "blogs.filter.category": "Catégorie",
    "blogs.featured": "Articles en Vedette",
    "blogs.latest": "Derniers Articles",

    // Inspiring Professionals
    "header.professionals": "Professionnels Inspirants",
    "professionals.hero.title": "Professionnels Aérospatiaux Inspirants",
    "professionals.hero.subtitle": "Rencontrez les visionnaires et innovateurs qui ont façonné l'ingénierie aérospatiale et continuent d'inspirer la prochaine génération.",
    "professionals.filter.category": "Catégorie",
    "professionals.filter.era": "Époque",
    "professionals.showing": "Affichage",
    "professionals.count": "professionnels",
    "professionals.cta.title": "Soyez Partie de l'Avenir",
    "professionals.cta.subtitle": "Ces pionniers ont commencé leurs voyages avec passion et détermination. Votre histoire pourrait inspirer la prochaine génération d'ingénieurs aérospatiaux.",
    "professionals.cta.button": "Commencez Votre Parcours",

    // Bachelor Orientation
    "header.orientation": "Guide du Baccalauréat",
    "orientation.hero.title": "Guide d'Orientation du Baccalauréat",
    "orientation.hero.subtitle": "Explorez les spécialités et programmes d'ingénierie aérospatiale en France et dans les pays anglophones. Trouvez le chemin parfait pour votre carrière.",
    "orientation.filter.country": "Pays",
    "orientation.filter.specialization": "Spécialisation",
    "orientation.showing": "Affichage",
    "orientation.programs": "programmes",
    "orientation.info.title": "Pour Commencer",
    "orientation.info.requirements.title": "Prérequis",
    "orientation.info.requirements.desc": "La plupart des programmes d'ingénierie aérospatiale nécessitent de solides connaissances en mathématiques, physique et chimie. Vérifiez les exigences spécifiques du programme pour les détails d'admission.",
    "orientation.info.support.title": "Soutien et Orientation",
    "orientation.info.support.desc": "Notre communauté est là pour vous aider. Connectez-vous avec des étudiants actuels et des professionnels pour en savoir plus sur les expériences du programme et les cheminements de carrière.",

    // Conferences
    "header.conferences": "Conférences et Webinaires",
    "conferences.hero.title": "Conférences et Webinaires Aérospatiaux",
    "conferences.hero.subtitle": "Rejoignez les principales conférences, webinaires et ateliers aérospatiaux. Connectez-vous avec des experts de l'industrie, des chercheurs et des professionnels du monde entier.",
    "conferences.filter.type": "Type d'Événement",
    "conferences.filter.format": "Format",
    "conferences.filter.category": "Catégorie",
    "conferences.featured": "Événements en Vedette",
    "conferences.all": "Tous les Événements",
    "conferences.cta.title": "Ne Manquez Pas",
    "conferences.cta.subtitle": "Inscrivez-vous aux conférences et webinaires aérospatiaux à venir pour rester connecté aux derniers développements de l'industrie.",
    "conferences.cta.button": "Parcourir Tous les Événements",
    "header.forum": "Forum",
    "header.certifications": "Certifications",
    "header.profile": "Mon Profil",

    // User Profile
    "profile.joined": "Inscrit le",
    "profile.editProfile": "Modifier le Profil",
    "profile.logout": "Déconnexion",
    "profile.coursesCompleted": "Cours Complétés",
    "profile.certificates": "Certificats",
    "profile.favorites": "Favoris",
    "profile.badges": "Badges",
    "profile.tab.dashboard": "Tableau de Bord",
    "profile.tab.favorites": "Favoris",
    "profile.tab.badges": "Badges",
    "profile.tab.notifications": "Notifications",
    "profile.about": "À Propos de Moi",
    "profile.preferences": "Préférences",
    "profile.emailNotifications": "Notifications par Email",
    "profile.newCourses": "Me notifier des nouveaux cours",
    "profile.eventReminders": "Rappels d'événements",
    "profile.learningProgress": "Progression d'Apprentissage",
    "profile.savedItems": "Éléments Enregistrés",
    "profile.achievements": "Réalisations",
    "profile.unlocked": "Déverrouillé",
    "profile.notificationSettings": "Paramètres de Notification",
    "profile.newArticles": "Nouveaux articles et blogs",
    "profile.communityUpdates": "Mises à jour de la communauté",

    // Forum
    "forum.title": "Forum Communautaire",
    "forum.subtitle": "Rejoignez les discussions avec des ingénieurs aérospatiaux, des chercheurs et des passionnés. Partagez vos connaissances, posez des questions et collaborez.",
    "forum.newThread": "Démarrer une Nouvelle Discussion",
    "forum.searchPlaceholder": "Rechercher des discussions...",
    "forum.pinned": "Épinglé",
    "forum.answered": "Répondu",
    "forum.views": "vues",
    "forum.replies": "réponses",
    "forum.posts": "messages",
    "forum.noThreads": "Aucune discussion trouvée. Soyez le premier à en démarrer une !",
    "forum.topContributors": "Meilleurs Contributeurs",
    "forum.rules": "Règles du Forum",
    "forum.rule1": "Soyez respectueux et professionnel",
    "forum.rule2": "Restez sur le sujet",
    "forum.rule3": "Fournissez des réponses utiles et détaillées",
    "forum.rule4": "Pas de spam ou d'auto-promotion",

    // Certifications
    "certifications.hero.title": "Certifications et Réalisations",
    "certifications.hero.subtitle": "Mettez en avant vos compétences et vos accomplissements en ingénierie aérospatiale et maintenance prédictive.",
    "certifications.certificates": "Certificats",
    "certifications.badges": "Badges Gagnés",
    "certifications.skillsLearned": "Compétences Apprises",
    "certifications.completion": "Taux d'Achèvement",
    "certifications.tab.certificates": "Certificats",
    "certifications.tab.badges": "Badges",
    "certifications.issuedBy": "Émis par",
    "certifications.credentialId": "ID d'Identifiant",
    "certifications.skillsGained": "Compétences Acquises",
    "certifications.verified": "Identifiant Vérifié",
    "certifications.viewCertificate": "Voir le Certificat",
    "certifications.download": "Télécharger",
    "certifications.share": "Partager",
    "certifications.criteria": "Critères",
    "certifications.earnedDate": "Date d'Obtention",
    "certifications.shareBadge": "Partager le Badge",
    "certifications.certificatePreview": "Aperçu du Certificat",
    "certifications.certificatePreviewText": "Votre certificat apparaîtra ici",

    // Community
    "community.hero.title": "Communauté Aérospatiale",
    "community.hero.subtitle": "Connectez-vous avec des milliers d'ingénieurs aérospatiaux, chercheurs et passionnés du monde entier.",
    "community.forums": "Forums de Discussion",
    "community.forums.desc": "Participez à des discussions actives sur la maintenance, l'IA, les carrières et l'innovation aérospatiale.",
    "community.directory": "Annuaire des Membres",
    "community.directory.desc": "Trouvez et connectez-vous avec des professionnels de l'aérospatiale et d'autres passionnés.",
    "community.events": "Événements et Webinaires",
    "community.events.desc": "Assistez à des événements virtuels, webinaires et sessions de réseautage avec des experts du secteur.",
    "community.qa": "Questions et Réponses d'Experts",
    "community.qa.desc": "Posez des questions et obtenez des réponses d'experts en ingénierie aérospatiale.",
    "community.cta.title": "Rejoignez Notre Communauté",
    "community.cta.subtitle": "Connectez-vous avec des professionnels de l'aérospatiale, partagez des connaissances, collaborez sur des projets et avancez dans votre carrière dans l'industrie aérospatiale.",
    "community.cta.button": "Créer Votre Profil",

    // Resources
    "resources.hero.title": "Ressources",
    "resources.hero.subtitle": "Accédez à des outils, du code, des ensembles de données et de la documentation pour les projets d'ingénierie aérospatiale.",
    "resources.projects.title": "Projets Open Source en Vedette",

    // About
    "about.hero.title": "À Propos",
    "about.hero.subtitle": "Construire l'avenir de l'ingénierie aérospatiale par l'éducation, l'innovation et la communauté.",
    "about.mission.title": "Notre Mission",
    "about.values.title": "Nos Valeurs Fondamentales",
    "about.values.innovation": "Innovation",
    "about.values.community": "Communauté",
    "about.values.excellence": "Excellence",
    "about.contact.title": "Nous Contacter",
    "about.contact.subtitle": "Avez-vous des questions, des suggestions ou souhaitez-vous collaborer ? Nous aimerions vous entendre.",
    "about.partners.title": "Nos Partenaires",

    // Footer
    "footer.learning": "Apprentissage",
    "footer.courses": "Cours et Tutoriels",
    "footer.documentation": "Documentation",
    "footer.certifications": "Certifications",
    "footer.community": "Communauté",
    "footer.forums": "Forums",
    "footer.events": "Événements",
    "footer.networking": "Réseautage",
    "footer.resources": "Ressources",
    "footer.tools": "Outils et Logiciels",
    "footer.datasets": "Ensembles de Données",
    "footer.papers": "Articles de Recherche",
    "footer.contact": "Contact",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",
    "footer.cookies": "Politique sur les Cookies",
    "footer.rights": "Tous droits réservés.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
