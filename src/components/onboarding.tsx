"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Building2,
  Users,
  Target,
  GraduationCap,
  BarChart3,
  Crown,
  Rocket,
  Sparkles,
  HeadphonesIcon,
  Settings,
  UserCircle,
  Award,
} from "lucide-react";

type OnboardingRole = "super-admin" | "admin-client" | "employee";

interface OnboardingStep {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
}

const stepsByRole: Record<OnboardingRole, OnboardingStep[]> = {
  "super-admin": [
    {
      icon: Crown,
      title: "Bienvenue sur CyberSense",
      description: "En tant que Super Admin Rostel High-Tech, vous avez une vue complète sur toutes les organisations clientes de la plateforme.",
      features: [
        "Tableau de bord global de la plateforme",
        "Suivi du MRR et des abonnements",
        "Métriques de performance en temps réel",
      ],
      color: "text-rht-orange",
      bgColor: "bg-rht-orange/10",
    },
    {
      icon: Building2,
      title: "Gestion des organisations",
      description: "Gérez toutes vos organisations clientes depuis un seul endroit. Ajoutez, modifiez et suivez chaque organisation.",
      features: [
        "Vue détaillée par organisation",
        "Filtrage par plan (Starter, Business, Enterprise)",
        "Score de risque et progression par org",
      ],
      color: "text-rht-orange",
      bgColor: "bg-rht-orange/10",
    },
    {
      icon: HeadphonesIcon,
      title: "Support centralisé",
      description: "Suivez et gérez les demandes de support de toutes les organisations depuis l'interface de ticketing.",
      features: [
        "Tickets classés par priorité",
        "Temps de réponse moyen",
        "Satisfaction client",
      ],
      color: "text-rht-orange",
      bgColor: "bg-rht-orange/10",
    },
    {
      icon: Rocket,
      title: "Vous êtes prêt !",
      description: "Votre tableau de bord Super Admin est configuré. Explorez la plateforme et commencez à piloter CyberSense.",
      features: [
        "Consultez le MRR et les tendances",
        "Vérifiez les organisations actives",
        "Traitez les tickets de support en attente",
      ],
      color: "text-rht-orange",
      bgColor: "bg-rht-orange/10",
    },
  ],
  "admin-client": [
    {
      icon: Shield,
      title: "Bienvenue sur CyberSense",
      description: "Votre plateforme de sensibilisation à la cybersécurité. Protégez votre organisation contre les cybermenaces humaines.",
      features: [
        "Dashboard avec score de risque global",
        "Vue en temps réel de la sécurité",
        "Indicateurs clés de performance",
      ],
      color: "text-rht-violet-light",
      bgColor: "bg-rht-violet/10",
    },
    {
      icon: Users,
      title: "Gérez vos employés",
      description: "Ajoutez vos collaborateurs et suivez leur progression individuelle en matière de cybersécurité.",
      features: [
        "Profils avec score de risque individuel",
        "Statut de formation par employé",
        "Identification des profils à risque",
      ],
      color: "text-rht-violet-light",
      bgColor: "bg-rht-violet/10",
    },
    {
      icon: GraduationCap,
      title: "Formations interactives",
      description: "Des modules de formation adaptés au contexte africain pour sensibiliser vos équipes aux menaces cyber.",
      features: [
        "Modules phishing, ingénierie sociale, MFA...",
        "Quiz interactifs avec scores",
        "Certificat de sensibilisation",
      ],
      color: "text-rht-violet-light",
      bgColor: "bg-rht-violet/10",
    },
    {
      icon: Target,
      title: "Simulations de phishing",
      description: "Lancez des campagnes de simulation réalistes pour tester la vigilance de vos équipes.",
      features: [
        "Faux emails personnalisés",
        "Résultats détaillés par campagne",
        "Taux de clic et de signalement",
      ],
      color: "text-rht-violet-light",
      bgColor: "bg-rht-violet/10",
    },
    {
      icon: Rocket,
      title: "Vous êtes prêt !",
      description: "Votre espace administrateur est configuré. Commencez à sécuriser votre organisation dès maintenant.",
      features: [
        "Consultez votre score de risque",
        "Inscrivez vos premiers employés",
        "Lancez une première campagne de simulation",
      ],
      color: "text-rht-violet-light",
      bgColor: "bg-rht-violet/10",
    },
  ],
  employee: [
    {
      icon: UserCircle,
      title: "Bienvenue sur CyberSense",
      description: "Votre organisation utilise CyberSense pour renforcer la vigilance de ses équipes face aux cybermenaces.",
      features: [
        "Espace personnel dédié",
        "Score de risque individuel",
        "Classement parmi vos collègues",
      ],
      color: "text-cyber-green",
      bgColor: "bg-cyber-green/10",
    },
    {
      icon: GraduationCap,
      title: "Vos formations",
      description: "Suivez des modules courts et interactifs pour apprendre à détecter les menaces cyber du quotidien.",
      features: [
        "Modules de 5 à 10 minutes",
        "Cas pratiques adaptés à l'Afrique",
        "Quiz pour valider vos connaissances",
      ],
      color: "text-cyber-green",
      bgColor: "bg-cyber-green/10",
    },
    {
      icon: Award,
      title: "Badges et certificat",
      description: "Gagnez des badges en progressant et obtenez votre certificat de sensibilisation CyberSense.",
      features: [
        "Badges pour chaque étape franchie",
        "Certificat après tous les modules",
        "Classement pour se challenger",
      ],
      color: "text-cyber-green",
      bgColor: "bg-cyber-green/10",
    },
    {
      icon: Sparkles,
      title: "C'est parti !",
      description: "Votre espace est prêt. Commencez votre première formation et protégez-vous contre les cybermenaces.",
      features: [
        "Démarrez le premier module",
        "Consultez votre score de risque",
        "Gagnez vos premiers badges",
      ],
      color: "text-cyber-green",
      bgColor: "bg-cyber-green/10",
    },
  ],
};

const roleTheme: Record<OnboardingRole, { gradient: string; buttonBg: string; progressColor: string }> = {
  "super-admin": {
    gradient: "from-rht-orange to-rht-orange-light",
    buttonBg: "bg-gradient-to-r from-rht-orange to-rht-orange-light",
    progressColor: "rht-orange",
  },
  "admin-client": {
    gradient: "from-rht-violet to-rht-violet-light",
    buttonBg: "bg-gradient-to-r from-rht-violet to-rht-violet-light",
    progressColor: "rht-violet",
  },
  employee: {
    gradient: "from-cyber-green/80 to-cyber-green",
    buttonBg: "bg-gradient-to-r from-cyber-green/90 to-cyber-green",
    progressColor: "cyber-green",
  },
};

export function Onboarding({
  role,
  onComplete,
}: {
  role: OnboardingRole;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const steps = stepsByRole[role];
  const theme = roleTheme[role];
  const isLast = step === steps.length - 1;
  const current = steps[step];
  const Icon = current.icon;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-gradient-to-br ${theme.gradient} blur-[150px]`}
        />
        <motion.div
          animate={{ opacity: [0.03, 0.1, 0.03], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className={`absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-br ${theme.gradient} blur-[150px]`}
        />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg px-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.buttonBg}`}>
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold">CyberSense</span>
          </div>
          <button
            onClick={onComplete}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Passer l'introduction
          </button>
        </div>

        <div className="mb-4">
          <Progress value={progress} className="h-1.5" />
          <p className="mt-1.5 text-right text-[10px] text-muted-foreground">
            {step + 1}/{steps.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="rounded-2xl border bg-card p-8">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
                className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${current.bgColor}`}
              >
                <Icon className={`h-10 w-10 ${current.color}`} />
              </motion.div>

              <h2 className="text-center text-xl font-bold">{current.title}</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground leading-relaxed">
                {current.description}
              </p>

              <div className="mt-6 space-y-3">
                {current.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 rounded-xl border p-3"
                  >
                    <CheckCircle className={`h-4 w-4 shrink-0 ${current.color}`} />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Précédent
                  </Button>
                ) : (
                  <div />
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={isLast ? onComplete : () => setStep(step + 1)}
                    className={`gap-2 ${theme.buttonBg} text-white hover:opacity-90`}
                  >
                    {isLast ? (
                      <>
                        Commencer
                        <Rocket className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Suivant
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? `w-6 ${theme.buttonBg}` : "w-2 bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
