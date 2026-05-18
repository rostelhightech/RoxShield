"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  KeyRound,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const hygieneScore = 42;

const stats = [
  { label: "Score hygiene MDP", value: "42/100", status: "Critique", color: "text-cyber-red" },
  { label: "MDP faibles detectes", value: "34%", status: "des employes", color: "text-cyber-red" },
  { label: "MDP reutilises", value: "28%", status: "des employes", color: "text-rht-orange" },
  { label: "MFA active", value: "23%", status: "des comptes", color: "text-rht-orange" },
];

const passwordIssues = [
  { issue: "Mots de passe de moins de 8 caracteres", count: 8, severity: "critical" as const },
  { issue: "Mots de passe sans caracteres speciaux", count: 15, severity: "high" as const },
  { issue: "Meme mot de passe sur plusieurs services", count: 12, severity: "high" as const },
  { issue: "MDP non change depuis +6 mois", count: 22, severity: "medium" as const },
  { issue: "MDP partage entre collegues", count: 6, severity: "critical" as const },
  { issue: "MDP note sur post-it / fichier", count: 4, severity: "critical" as const },
];

const mfaData = [
  { name: "MFA active", value: 10, color: "#16a34a" },
  { name: "MFA inactive", value: 35, color: "#ef4444" },
];

const sevStyle = {
  critical: "bg-cyber-red/10 text-cyber-red",
  high: "bg-rht-orange/10 text-rht-orange",
  medium: "bg-yellow-500/10 text-yellow-500",
};

const recommendations = [
  {
    title: "Deployer un gestionnaire de mots de passe",
    desc: "Bitwarden (gratuit) ou 1Password Business pour centraliser et securiser tous les MDP.",
    priority: "Urgent",
    link: "https://bitwarden.com",
  },
  {
    title: "Activer le MFA sur tous les comptes",
    desc: "Authentification multi-facteurs obligatoire, en priorite sur les emails et outils critiques.",
    priority: "Urgent",
    link: null,
  },
  {
    title: "Formation hygiene des mots de passe",
    desc: "Module RoxShield de 15 minutes avec quiz interactif sur les bonnes pratiques.",
    priority: "Important",
    link: null,
  },
  {
    title: "Politique de rotation des MDP",
    desc: "Changement obligatoire tous les 90 jours avec historique de 5 MDP.",
    priority: "Recommande",
    link: null,
  },
];

export default function PasswordsPage() {
  return (
    <div>
      <Header title="Hygiene des Mots de Passe" />
      <div className="space-y-6 p-6">
        {/* Stats */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-muted-foreground">{s.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Problèmes détectés */}
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldAlert className="h-4 w-4 text-cyber-red" />
                  Problemes detectes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {passwordIssues.map((issue) => (
                    <div key={issue.issue} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        {issue.severity === "critical" ? (
                          <XCircle className="h-4 w-4 shrink-0 text-cyber-red" />
                        ) : issue.severity === "high" ? (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-rht-orange" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-500" />
                        )}
                        <span className="text-sm">{issue.issue}</span>
                      </div>
                      <Badge className={`text-[10px] ${sevStyle[issue.severity]}`}>
                        {issue.count} employes
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* MFA + Score */}
          <div className="space-y-6">
            <FadeIn delay={0.15}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Adoption MFA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="h-32 w-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={mfaData} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" paddingAngle={3}>
                            {mfaData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-cyber-green" />
                        <span className="text-sm">MFA active — 10 comptes (23%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-cyber-red" />
                        <span className="text-sm">MFA inactive — 35 comptes (77%)</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Objectif : 100% des comptes avec MFA d&apos;ici 30 jours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recommandations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((rec) => (
                    <div key={rec.title} className="rounded-lg border p-3">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-semibold">{rec.title}</h4>
                        <Badge className={`text-[10px] ${
                          rec.priority === "Urgent" ? "bg-cyber-red/10 text-cyber-red"
                          : rec.priority === "Important" ? "bg-rht-orange/10 text-rht-orange"
                          : "bg-rht-violet/10 text-rht-violet-light"
                        }`}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{rec.desc}</p>
                      {rec.link && (
                        <a href={rec.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-rht-violet-light hover:underline">
                          En savoir plus <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
