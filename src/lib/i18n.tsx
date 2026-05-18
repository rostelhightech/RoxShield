"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "fr" | "en";

const dictionaries = {
  fr: {
    // Common
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.search": "Rechercher",
    "common.export": "Exporter",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.add": "Ajouter",
    "common.close": "Fermer",
    "common.loading": "Chargement...",
    "common.saved": "Enregistré !",
    "common.yes": "Oui",
    "common.no": "Non",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.employees": "Employés",
    "nav.simulations": "Simulations",
    "nav.training": "Formations",
    "nav.reports": "Rapports & Analytics",
    "nav.settings": "Paramètres",
    "nav.profile": "Mon profil",
    "nav.setup": "Configuration",
    "nav.mySpace": "Mon espace",
    "nav.results": "Mes résultats",
    "nav.badges": "Badges",
    "nav.leaderboard": "Classement",
    "nav.logout": "Se déconnecter",
    "nav.about": "À propos",
    "nav.home": "Accueil",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.riskScore": "Score de risque moyen",
    "dashboard.atRiskEmployees": "Employés à risque",
    "dashboard.trainingsCompleted": "Formations complétées",
    "dashboard.totalEmployees": "Total employés",
    "dashboard.riskEvolution": "Évolution du risque humain",
    "dashboard.riskByDept": "Risque par département",
    "dashboard.highRiskEmployees": "Employés à risque élevé",
    "dashboard.thisMonth": "ce mois",
    "dashboard.outOf": "sur",
    "dashboard.employees": "employés",
    "dashboard.safeZone": "en zone sûre",

    // Employees
    "employees.title": "Employés",
    "employees.search": "Rechercher un employé...",
    "employees.name": "Nom",
    "employees.department": "Département",
    "employees.role": "Rôle",
    "employees.riskScore": "Score de risque",
    "employees.trainings": "Formations",
    "employees.status": "Statut",
    "employees.safe": "Sûr",
    "employees.moderate": "Modéré",
    "employees.atRisk": "À risque",

    // Simulations
    "simulations.title": "Simulations de phishing",
    "simulations.newCampaign": "Nouvelle campagne",
    "simulations.activeCampaigns": "Campagnes actives",
    "simulations.totalSent": "Emails envoyés",
    "simulations.clickRate": "Taux de clic",
    "simulations.reportRate": "Taux de signalement",

    // Training
    "training.title": "Modules de formation",
    "training.start": "Commencer",
    "training.continue": "Continuer",
    "training.completed": "Terminé",
    "training.duration": "Durée",
    "training.minutes": "min",

    // Reports
    "reports.title": "Rapports & Analytics",
    "reports.exportCSV": "Export CSV",
    "reports.exportPDF": "Exporter PDF",
    "reports.overview": "Vue d'ensemble",
    "reports.departments": "Départements",
    "reports.history": "Historique",
    "reports.riskEvolution": "Évolution du risque",
    "reports.phishingTrend": "Tendance phishing",
    "reports.statusDistribution": "Répartition des statuts",

    // Settings
    "settings.title": "Paramètres",
    "settings.organization": "Organisation",
    "settings.notifications": "Notifications",
    "settings.security": "Sécurité",
    "settings.team": "Équipe admin",
    "settings.orgInfo": "Informations de l'organisation",
    "settings.plan": "Plan & Abonnement",

    // Profile
    "profile.title": "Mon profil",
    "profile.personalInfo": "Informations personnelles",
    "profile.firstName": "Prénom",
    "profile.lastName": "Nom",
    "profile.email": "Adresse email",
    "profile.phone": "Téléphone",
    "profile.position": "Poste",
    "profile.department": "Département",
    "profile.language": "Langue",
    "profile.notificationPrefs": "Préférences de notification",
    "profile.security": "Sécurité",
    "profile.currentPassword": "Mot de passe actuel",
    "profile.newPassword": "Nouveau mot de passe",
    "profile.confirmPassword": "Confirmer",
    "profile.2fa": "Authentification 2FA",

    // Employee space
    "employee.welcome": "Bienvenue",
    "employee.yourRiskScore": "Votre score de risque",
    "employee.streak": "Série en cours",
    "employee.days": "jours",
    "employee.recentActivity": "Activité récente",
    "employee.riskEvolution": "Évolution de votre score",

    // Badges
    "badges.title": "Badges & Récompenses",
    "badges.earned": "badges obtenus",
    "badges.completion": "Complétion",
    "badges.unlocked": "Badges débloqués",
    "badges.inProgress": "En cours de progression",
    "badges.progress": "Progression",

    // Employee space extra
    "employee.phishingDetected": "Phishing détectés",
    "employee.quizAvgScore": "Score quiz moyen",
    "employee.progression": "Progression globale",
    "employee.certificate": "Certificat de sensibilisation",
    "employee.certificateDesc": "Complétez tous les modules pour obtenir votre certificat RoxShield",
    "employee.modulesRemaining": "modules restants",
    "employee.streakMessage": "jours d'affilée",
    "employee.riskDecreasing": "Votre score de risque baisse — continuez comme ça !",

    // Leaderboard
    "leaderboard.title": "Classement",
    "leaderboard.yourPosition": "Votre position",
    "leaderboard.points": "Points",
    "leaderboard.streakDays": "Jours série",
    "leaderboard.fullRanking": "Classement complet",
    "leaderboard.howToEarn": "Comment gagner des points ?",
    "leaderboard.detectPhishing": "Détecter un phishing",
    "leaderboard.completeTraining": "Terminer une formation",
    "leaderboard.dailyStreak": "Série quotidienne",
    "leaderboard.earnBadge": "Obtenir un badge",
    "leaderboard.you": "vous",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.markAllRead": "Tout marquer comme lu",
    "notifications.viewAll": "Voir toutes les notifications",
    "notifications.search": "Rechercher...",

    // Landing
    "landing.hero.badge": "Plateforme de Human Security Training",
    "landing.hero.title1": "Transformez vos employés en",
    "landing.hero.title2": "première ligne de défense",
    "landing.hero.subtitle": "RoxShield aide les entreprises africaines à réduire le risque humain grâce aux simulations de phishing, micro-formations gamifiées et tableaux de bord intelligents.",
    "landing.hero.cta": "Essayer la démo",
    "landing.hero.ctaSecondary": "Voir le dashboard",
    "landing.hero.demo": "Voir la démo",
    "landing.nav.features": "Fonctionnalités",
    "landing.nav.stats": "Chiffres",
    "landing.nav.pricing": "Tarifs",
    "landing.nav.login": "Se connecter",
    "landing.nav.freeDemo": "Démo gratuite",
    "landing.howItWorks": "Comment ça marche",
    "landing.howItWorks.title": "3 étapes pour sécuriser vos équipes",
    "landing.step1.title": "Inscrivez vos employés",
    "landing.step1.desc": "Importez votre équipe en quelques clics. Chaque employé reçoit un accès personnalisé à son espace de formation.",
    "landing.step2.title": "Lancez des simulations",
    "landing.step2.desc": "Envoyez des campagnes de phishing réalistes adaptées au contexte africain. Mesurez les réactions de vos équipes.",
    "landing.step3.title": "Suivez les progrès",
    "landing.step3.desc": "Visualisez l'évolution du risque par employé et département. Les formations se personnalisent automatiquement.",
    "landing.features.badge": "Fonctionnalités",
    "landing.features.title": "Tout ce qu'il faut pour sécuriser le facteur humain",
    "landing.features.subtitle": "Une plateforme complète de sensibilisation, formation et simulation en cybersécurité.",
    "landing.feat1.title": "Simulations de phishing",
    "landing.feat1.desc": "Faux emails RH, PDG, fournisseurs, WhatsApp — testez la vigilance de vos équipes avec des scénarios réalistes adaptés au contexte africain.",
    "landing.feat2.title": "Micro-formations gamifiées",
    "landing.feat2.desc": "Modules de 5 à 10 minutes avec quiz interactifs, vidéos et cas pratiques. Vos employés apprennent en s'entraînant.",
    "landing.feat3.title": "Dashboard de risque humain",
    "landing.feat3.desc": "Visualisez le score de risque par employé, département et organisation. Identifiez les profils vulnérables en un coup d'œil.",
    "landing.feat4.title": "IA de détection",
    "landing.feat4.desc": "Notre intelligence artificielle identifie les profils à risque et personnalise automatiquement les parcours de formation.",
    "landing.feat5.title": "Gamification & Badges",
    "landing.feat5.desc": "Classements internes, badges Cyber Defender et Phishing Hunter, certificats de sensibilisation pour motiver vos équipes.",
    "landing.feat6.title": "Conçu pour l'Afrique",
    "landing.feat6.desc": "Cas pratiques locaux, arnaques Mobile Money, fraude WhatsApp, tarifs adaptés et interface en français.",
    "landing.feat7.title": "GRC & Conformité",
    "landing.feat7.desc": "Score de maturité cyber, checklist conformité (RGPD, ISO 27001), registre des risques et rapports d'audit exportables.",
    "landing.feat8.title": "Sécurité Email Avancée",
    "landing.feat8.desc": "Au-delà du phishing : détection BEC, spear phishing, spoofing. Scoring comportemental email par employé et département.",
    "landing.feat9.title": "Shadow IT & Chiffrement",
    "landing.feat9.desc": "Détectez les fuites WhatsApp/Telegram, auditez les pratiques de chiffrement et renforcez l'hygiène des mots de passe.",
    "landing.pricing": "Tarifs",
    "landing.pricing.title": "Des plans adaptés à chaque organisation",
    "landing.pricing.subtitle": "Abonnement mensuel ou annuel. Tarifs éducatifs disponibles pour les écoles et universités.",
    "landing.pricing.popular": "Populaire",
    "landing.pricing.cta": "Demander un devis",
    "landing.testimonials": "Témoignages",
    "landing.testimonials.title": "Ils nous font confiance",
    "landing.testimonials.subtitle": "Des organisations africaines qui renforcent leur sécurité humaine au quotidien.",
    "landing.cta.title": "Prêt à sécuriser vos équipes ?",
    "landing.cta.subtitle": "Rejoignez les entreprises africaines qui transforment leurs employés en première ligne de défense contre les cyberattaques.",
    "landing.cta.button": "Commencer maintenant",
    "landing.footer.rights": "Tous droits réservés.",
    "landing.devis.title": "Demander un devis",
    "landing.devis.subtitle": "Remplissez le formulaire et notre équipe vous contactera sous 24h.",
    "landing.devis.name": "Nom complet",
    "landing.devis.email": "Email professionnel",
    "landing.devis.org": "Organisation",
    "landing.devis.employees": "Nombre d'employés",
    "landing.devis.submit": "Envoyer la demande",
    "landing.devis.sent": "Demande envoyée !",
    "landing.devis.sentDesc": "Nous vous répondrons très rapidement.",
    "landing.stat1": "des cyberattaques commencent par une erreur humaine",
    "landing.stat2": "de micro-formation par jour suffisent",
    "landing.stat3": "de clics sur le phishing après 3 mois",
    "landing.stat4": "modules de formation disponibles",
  },
  en: {
    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.back": "Back",
    "common.next": "Next",
    "common.search": "Search",
    "common.export": "Export",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.close": "Close",
    "common.loading": "Loading...",
    "common.saved": "Saved!",
    "common.yes": "Yes",
    "common.no": "No",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.employees": "Employees",
    "nav.simulations": "Simulations",
    "nav.training": "Training",
    "nav.reports": "Reports & Analytics",
    "nav.settings": "Settings",
    "nav.profile": "My Profile",
    "nav.setup": "Setup",
    "nav.mySpace": "My Space",
    "nav.results": "My Results",
    "nav.badges": "Badges",
    "nav.leaderboard": "Leaderboard",
    "nav.logout": "Log out",
    "nav.about": "About",
    "nav.home": "Home",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.riskScore": "Average risk score",
    "dashboard.atRiskEmployees": "At-risk employees",
    "dashboard.trainingsCompleted": "Trainings completed",
    "dashboard.totalEmployees": "Total employees",
    "dashboard.riskEvolution": "Human risk evolution",
    "dashboard.riskByDept": "Risk by department",
    "dashboard.highRiskEmployees": "High-risk employees",
    "dashboard.thisMonth": "this month",
    "dashboard.outOf": "out of",
    "dashboard.employees": "employees",
    "dashboard.safeZone": "in safe zone",

    // Employees
    "employees.title": "Employees",
    "employees.search": "Search an employee...",
    "employees.name": "Name",
    "employees.department": "Department",
    "employees.role": "Role",
    "employees.riskScore": "Risk score",
    "employees.trainings": "Trainings",
    "employees.status": "Status",
    "employees.safe": "Safe",
    "employees.moderate": "Moderate",
    "employees.atRisk": "At risk",

    // Simulations
    "simulations.title": "Phishing simulations",
    "simulations.newCampaign": "New campaign",
    "simulations.activeCampaigns": "Active campaigns",
    "simulations.totalSent": "Emails sent",
    "simulations.clickRate": "Click rate",
    "simulations.reportRate": "Report rate",

    // Training
    "training.title": "Training modules",
    "training.start": "Start",
    "training.continue": "Continue",
    "training.completed": "Completed",
    "training.duration": "Duration",
    "training.minutes": "min",

    // Reports
    "reports.title": "Reports & Analytics",
    "reports.exportCSV": "Export CSV",
    "reports.exportPDF": "Export PDF",
    "reports.overview": "Overview",
    "reports.departments": "Departments",
    "reports.history": "History",
    "reports.riskEvolution": "Risk evolution",
    "reports.phishingTrend": "Phishing trend",
    "reports.statusDistribution": "Status distribution",

    // Settings
    "settings.title": "Settings",
    "settings.organization": "Organization",
    "settings.notifications": "Notifications",
    "settings.security": "Security",
    "settings.team": "Admin team",
    "settings.orgInfo": "Organization info",
    "settings.plan": "Plan & Subscription",

    // Profile
    "profile.title": "My Profile",
    "profile.personalInfo": "Personal information",
    "profile.firstName": "First name",
    "profile.lastName": "Last name",
    "profile.email": "Email address",
    "profile.phone": "Phone",
    "profile.position": "Position",
    "profile.department": "Department",
    "profile.language": "Language",
    "profile.notificationPrefs": "Notification preferences",
    "profile.security": "Security",
    "profile.currentPassword": "Current password",
    "profile.newPassword": "New password",
    "profile.confirmPassword": "Confirm",
    "profile.2fa": "Two-factor authentication",

    // Employee space
    "employee.welcome": "Welcome",
    "employee.yourRiskScore": "Your risk score",
    "employee.streak": "Current streak",
    "employee.days": "days",
    "employee.recentActivity": "Recent activity",
    "employee.riskEvolution": "Your score evolution",

    // Badges
    "badges.title": "Badges & Rewards",
    "badges.earned": "badges earned",
    "badges.completion": "Completion",
    "badges.unlocked": "Unlocked badges",
    "badges.inProgress": "In progress",
    "badges.progress": "Progress",

    // Employee space extra
    "employee.phishingDetected": "Phishing detected",
    "employee.quizAvgScore": "Quiz avg. score",
    "employee.progression": "Overall progress",
    "employee.certificate": "Awareness certificate",
    "employee.certificateDesc": "Complete all modules to earn your RoxShield certificate",
    "employee.modulesRemaining": "modules remaining",
    "employee.streakMessage": "days in a row",
    "employee.riskDecreasing": "Your risk score is going down — keep it up!",

    // Leaderboard
    "leaderboard.title": "Leaderboard",
    "leaderboard.yourPosition": "Your position",
    "leaderboard.points": "Points",
    "leaderboard.streakDays": "Streak days",
    "leaderboard.fullRanking": "Full ranking",
    "leaderboard.howToEarn": "How to earn points?",
    "leaderboard.detectPhishing": "Detect a phishing",
    "leaderboard.completeTraining": "Complete a training",
    "leaderboard.dailyStreak": "Daily streak",
    "leaderboard.earnBadge": "Earn a badge",
    "leaderboard.you": "you",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.markAllRead": "Mark all as read",
    "notifications.viewAll": "View all notifications",
    "notifications.search": "Search...",

    // Landing
    "landing.hero.badge": "Human Security Training Platform",
    "landing.hero.title1": "Turn your employees into your",
    "landing.hero.title2": "first line of defense",
    "landing.hero.subtitle": "RoxShield helps African businesses reduce human risk through phishing simulations, gamified micro-trainings and intelligent dashboards.",
    "landing.hero.cta": "Try the demo",
    "landing.hero.ctaSecondary": "View dashboard",
    "landing.hero.demo": "Watch demo",
    "landing.nav.features": "Features",
    "landing.nav.stats": "Stats",
    "landing.nav.pricing": "Pricing",
    "landing.nav.login": "Log in",
    "landing.nav.freeDemo": "Free demo",
    "landing.howItWorks": "How it works",
    "landing.howItWorks.title": "3 steps to secure your teams",
    "landing.step1.title": "Register your employees",
    "landing.step1.desc": "Import your team in a few clicks. Each employee gets personalized access to their training space.",
    "landing.step2.title": "Launch simulations",
    "landing.step2.desc": "Send realistic phishing campaigns adapted to the African context. Measure your team's reactions.",
    "landing.step3.title": "Track progress",
    "landing.step3.desc": "Visualize risk evolution by employee and department. Trainings are automatically personalized.",
    "landing.features.badge": "Features",
    "landing.features.title": "Everything you need to secure the human factor",
    "landing.features.subtitle": "A complete platform for awareness, training and cybersecurity simulation.",
    "landing.feat1.title": "Phishing simulations",
    "landing.feat1.desc": "Fake HR, CEO, supplier and WhatsApp emails — test your team's vigilance with realistic scenarios adapted to the African context.",
    "landing.feat2.title": "Gamified micro-trainings",
    "landing.feat2.desc": "5 to 10-minute modules with interactive quizzes, videos and case studies. Your employees learn by practicing.",
    "landing.feat3.title": "Human risk dashboard",
    "landing.feat3.desc": "Visualize risk score by employee, department and organization. Identify vulnerable profiles at a glance.",
    "landing.feat4.title": "AI detection",
    "landing.feat4.desc": "Our artificial intelligence identifies at-risk profiles and automatically personalizes training paths.",
    "landing.feat5.title": "Gamification & Badges",
    "landing.feat5.desc": "Internal rankings, Cyber Defender and Phishing Hunter badges, awareness certificates to motivate your teams.",
    "landing.feat6.title": "Built for Africa",
    "landing.feat6.desc": "Local case studies, Mobile Money scams, WhatsApp fraud, adapted pricing and French interface.",
    "landing.feat7.title": "GRC & Compliance",
    "landing.feat7.desc": "Cyber maturity score, compliance checklists (GDPR, ISO 27001), risk register and exportable audit reports.",
    "landing.feat8.title": "Advanced Email Security",
    "landing.feat8.desc": "Beyond phishing: BEC, spear phishing, spoofing detection. Behavioral email scoring per employee and department.",
    "landing.feat9.title": "Shadow IT & Encryption",
    "landing.feat9.desc": "Detect WhatsApp/Telegram data leaks, audit encryption practices and strengthen password hygiene across your organization.",
    "landing.pricing": "Pricing",
    "landing.pricing.title": "Plans adapted to every organization",
    "landing.pricing.subtitle": "Monthly or annual subscription. Educational pricing available for schools and universities.",
    "landing.pricing.popular": "Popular",
    "landing.pricing.cta": "Request a quote",
    "landing.testimonials": "Testimonials",
    "landing.testimonials.title": "They trust us",
    "landing.testimonials.subtitle": "African organizations strengthening their human security every day.",
    "landing.cta.title": "Ready to secure your teams?",
    "landing.cta.subtitle": "Join the African businesses turning their employees into the first line of defense against cyberattacks.",
    "landing.cta.button": "Get started now",
    "landing.footer.rights": "All rights reserved.",
    "landing.devis.title": "Request a quote",
    "landing.devis.subtitle": "Fill out the form and our team will contact you within 24h.",
    "landing.devis.name": "Full name",
    "landing.devis.email": "Business email",
    "landing.devis.org": "Organization",
    "landing.devis.employees": "Number of employees",
    "landing.devis.submit": "Send request",
    "landing.devis.sent": "Request sent!",
    "landing.devis.sentDesc": "We'll get back to you very soon.",
    "landing.stat1": "of cyberattacks start with human error",
    "landing.stat2": "of daily micro-training is enough",
    "landing.stat3": "phishing clicks after 3 months",
    "landing.stat4": "training modules available",
  },
} as const;

type DictKey = keyof (typeof dictionaries)["fr"];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: DictKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("roxshield_locale") as Locale) || "fr";
    }
    return "fr";
  });

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("roxshield_locale", newLocale);
  }, []);

  const t = useCallback(
    (key: DictKey): string => {
      return dictionaries[locale][key] || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
