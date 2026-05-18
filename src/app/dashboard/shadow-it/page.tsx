"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquareLock,
  AlertTriangle,
  Smartphone,
  FileWarning,
  Users,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const shadowScore = 35;

const riskApps = [
  { name: "WhatsApp", usage: 89, risk: "Eleve", riskLevel: "high" as const, dataShared: "Fichiers clients, mots de passe, contrats" },
  { name: "Telegram", usage: 34, risk: "Eleve", riskLevel: "high" as const, dataShared: "Documents internes, captures d'ecran" },
  { name: "Google Drive perso", usage: 45, risk: "Moyen", riskLevel: "medium" as const, dataShared: "Tableurs RH, rapports financiers" },
  { name: "Gmail perso", usage: 52, risk: "Eleve", riskLevel: "high" as const, dataShared: "Emails professionnels transferes" },
  { name: "WeTransfer", usage: 28, risk: "Moyen", riskLevel: "medium" as const, dataShared: "Fichiers volumineux non chiffres" },
  { name: "Dropbox perso", usage: 18, risk: "Faible", riskLevel: "low" as const, dataShared: "Documents divers" },
];

const deptExposure = [
  { dept: "Commercial", score: 78 },
  { dept: "Finance", score: 65 },
  { dept: "Direction", score: 58 },
  { dept: "RH", score: 52 },
  { dept: "Operations", score: 45 },
  { dept: "IT", score: 15 },
];

const incidents = [
  { date: "16 Mai", desc: "Contrat client envoye via WhatsApp groupe", dept: "Commercial", severity: "Critique" },
  { date: "15 Mai", desc: "MDP partage sur Telegram entre collegues", dept: "Finance", severity: "Critique" },
  { date: "14 Mai", desc: "Rapport financier uploade sur Google Drive perso", dept: "Finance", severity: "Eleve" },
  { date: "12 Mai", desc: "Email pro transfere sur Gmail personnel", dept: "Direction", severity: "Eleve" },
  { date: "10 Mai", desc: "Photos de badges envoyes par WhatsApp", dept: "RH", severity: "Moyen" },
];

const riskLevelStyle = {
  high: "bg-cyber-red/10 text-cyber-red",
  medium: "bg-rht-orange/10 text-rht-orange",
  low: "bg-cyber-green/10 text-cyber-green",
};

export default function ShadowITPage() {
  return (
    <div>
      <Header title="Shadow IT & Communication Securisee" />
      <div className="space-y-6 p-6">
        {/* Alerte principale */}
        <FadeIn>
          <Card className="border-cyber-red/30 bg-cyber-red/5">
            <CardContent className="flex items-start gap-4 p-5">
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-cyber-red" />
              <div>
                <h3 className="font-semibold text-cyber-red">Alerte Shadow IT</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <strong>89% de vos employes</strong> utilisent WhatsApp pour echanger des informations professionnelles sensibles.
                  Cela represente un risque majeur de fuite de donnees sans aucune traçabilite ni chiffrement entreprise.
                </p>
                <Button variant="outline" size="sm" className="mt-3 gap-2 border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10">
                  Lancer la formation Shadow IT
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.05}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Score Shadow IT</p>
                <p className="mt-1 text-2xl font-bold text-cyber-red">{shadowScore}/100</p>
                <p className="text-[11px] text-muted-foreground">Risque eleve</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Apps non autorisees</p>
                <p className="mt-1 text-2xl font-bold text-rht-orange">6</p>
                <p className="text-[11px] text-muted-foreground">detectees en usage</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Employes exposes</p>
                <p className="mt-1 text-2xl font-bold text-cyber-red">40/45</p>
                <p className="text-[11px] text-muted-foreground">89% de l&apos;effectif</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Fuites potentielles</p>
                <p className="mt-1 text-2xl font-bold text-rht-orange">23</p>
                <p className="text-[11px] text-muted-foreground">ce mois-ci</p>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Apps à risque */}
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Smartphone className="h-4 w-4 text-rht-orange" />
                  Applications a risque detectees
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskApps.map((app) => (
                  <div key={app.name} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{app.name}</span>
                        <Badge className={`text-[10px] ${riskLevelStyle[app.riskLevel]}`}>
                          {app.risk}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{app.usage}% des employes</span>
                    </div>
                    <Progress value={app.usage} className="mt-2 h-1.5" />
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      <FileWarning className="mr-1 inline h-3 w-3" />
                      Donnees partagees : {app.dataShared}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          <div className="space-y-6">
            {/* Exposition par département */}
            <FadeIn delay={0.15}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Exposition par departement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deptExposure} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={80} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#ef4444" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Incidents */}
            <FadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Incidents recents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {incidents.map((inc, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="shrink-0 text-[11px] text-muted-foreground w-12">{inc.date}</span>
                        <div className="flex-1">
                          <p>{inc.desc}</p>
                          <p className="text-[11px] text-muted-foreground">{inc.dept}</p>
                        </div>
                        <Badge className={`shrink-0 text-[10px] ${
                          inc.severity === "Critique" ? "bg-cyber-red/10 text-cyber-red"
                          : inc.severity === "Eleve" ? "bg-rht-orange/10 text-rht-orange"
                          : "bg-yellow-500/10 text-yellow-500"
                        }`}>
                          {inc.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
