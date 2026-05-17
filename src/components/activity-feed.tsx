"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { PulseDot } from "@/components/pulse-dot";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  GraduationCap,
  Mail,
  UserCheck,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface Activity {
  id: number;
  type: "phishing_detected" | "training_completed" | "badge_earned" | "risk_alert" | "user_joined" | "simulation_sent";
  user: string;
  description: string;
  time: string;
}

const iconMap = {
  phishing_detected: { icon: AlertTriangle, color: "text-rht-orange", bg: "bg-rht-orange/10" },
  training_completed: { icon: GraduationCap, color: "text-cyber-green", bg: "bg-cyber-green/10" },
  badge_earned: { icon: Shield, color: "text-rht-violet", bg: "bg-rht-violet/10" },
  risk_alert: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  user_joined: { icon: UserCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
  simulation_sent: { icon: Mail, color: "text-rht-violet-light", bg: "bg-rht-violet/10" },
};

const activities: Activity[] = [
  { id: 1, type: "phishing_detected", user: "Fatou Sow", description: "A signalé un email suspect", time: "Il y a 2 min" },
  { id: 2, type: "training_completed", user: "Amadou Diallo", description: "Module « Phishing avancé » terminé", time: "Il y a 8 min" },
  { id: 3, type: "badge_earned", user: "Marie Ndiaye", description: "Badge « Œil de lynx » obtenu", time: "Il y a 15 min" },
  { id: 4, type: "simulation_sent", user: "Système", description: "Campagne « Faux virement » lancée (23 cibles)", time: "Il y a 25 min" },
  { id: 5, type: "risk_alert", user: "Ibrahima Ba", description: "Score de risque passé au-dessus de 70%", time: "Il y a 32 min" },
  { id: 6, type: "training_completed", user: "Aïssatou Fall", description: "Module « Mots de passe » terminé", time: "Il y a 45 min" },
  { id: 7, type: "user_joined", user: "Ousmane Gueye", description: "A rejoint la plateforme", time: "Il y a 1h" },
  { id: 8, type: "phishing_detected", user: "Khady Diop", description: "A signalé un SMS frauduleux", time: "Il y a 1h30" },
];

export function ActivityFeed() {
  const { locale } = useTranslation();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <PulseDot color="green" size="md" />
            {locale === "en" ? "Recent Activity" : "Activité récente"}
          </CardTitle>
          <Badge variant="outline" className="text-[10px]">
            {locale === "en" ? "Live" : "En direct"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.map((activity, i) => {
            const config = iconMap[activity.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-accent/50"
              >
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground"> — {activity.description}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
