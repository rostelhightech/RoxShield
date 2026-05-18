"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Download,
  TrendingUp,
  Building2,
  Scale,
  Globe,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const maturityScore = 62;

const frameworks = [
  {
    name: "RGPD / APDP",
    description: "Protection des donnees personnelles",
    score: 78,
    status: "partial" as const,
    items: { total: 24, compliant: 19, partial: 3, missing: 2 },
  },
  {
    name: "ISO 27001",
    description: "Systeme de management de la securite",
    score: 55,
    status: "partial" as const,
    items: { total: 114, compliant: 63, partial: 28, missing: 23 },
  },
  {
    name: "Loi senegalaise n2008-12",
    description: "Protection des donnees a caractere personnel",
    score: 82,
    status: "partial" as const,
    items: { total: 18, compliant: 15, partial: 2, missing: 1 },
  },
  {
    name: "PCI DSS",
    description: "Securite des donnees de paiement",
    score: 41,
    status: "low" as const,
    items: { total: 78, compliant: 32, partial: 18, missing: 28 },
  },
];

const riskRegister = [
  {
    id: "R-001",
    risk: "Phishing cible sur la direction",
    impact: "Critique",
    probability: "Elevee",
    level: "critical" as const,
    mitigation: "Formation executive + simulation mensuelle",
    owner: "RSSI",
  },
  {
    id: "R-002",
    risk: "Fuite de donnees via WhatsApp",
    impact: "Eleve",
    probability: "Elevee",
    level: "high" as const,
    mitigation: "Politique Shadow IT + formation employes",
    owner: "DRH",
  },
  {
    id: "R-003",
    risk: "Mots de passe faibles / partages",
    impact: "Eleve",
    probability: "Moyenne",
    level: "high" as const,
    mitigation: "Deploiement gestionnaire MDP + politique",
    owner: "DSI",
  },
  {
    id: "R-004",
    risk: "Non-conformite RGPD",
    impact: "Eleve",
    probability: "Faible",
    level: "medium" as const,
    mitigation: "Audit trimestriel + formation juridique",
    owner: "DPO",
  },
  {
    id: "R-005",
    risk: "Ransomware via piece jointe email",
    impact: "Critique",
    probability: "Moyenne",
    level: "high" as const,
    mitigation: "Filtrage email + formation detection",
    owner: "DSI",
  },
];

const levelStyle = {
  critical: "bg-cyber-red/10 text-cyber-red",
  high: "bg-rht-orange/10 text-rht-orange",
  medium: "bg-yellow-500/10 text-yellow-500",
  low: "bg-cyber-green/10 text-cyber-green",
};

const gapData = [
  { name: "Conforme", value: 129, color: "#16a34a" },
  { name: "Partiel", value: 51, color: "#fa990e" },
  { name: "Manquant", value: 54, color: "#ef4444" },
];

export default function GRCPage() {
  return (
    <div>
      <Header title="GRC — Gouvernance, Risque & Conformite" />
      <div className="space-y-6 p-6">
        {/* Score de maturité */}
        <FadeIn>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-rht-violet-light" />
                  Score de maturite cyber
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative h-40 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="100%"
                        startAngle={180}
                        endAngle={0}
                        data={[{ value: maturityScore, fill: maturityScore > 70 ? "#16a34a" : maturityScore > 40 ? "#fa990e" : "#ef4444" }]}
                      >
                        <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(var(--muted))" }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{maturityScore}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <Badge className="mt-2 bg-rht-orange/10 text-rht-orange">
                    Niveau intermediaire
                  </Badge>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    +8 pts depuis le dernier trimestre
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Scale className="h-4 w-4 text-rht-violet-light" />
                  Gap Analysis global
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="h-40 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gapData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={65}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {gapData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="mt-2 flex justify-center gap-4 text-xs">
                  {gapData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-muted-foreground">
                        {d.name} ({d.value})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-rht-violet-light" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Exporter rapport PDF
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                  <FileText className="h-4 w-4" />
                  Generer rapport d&apos;audit
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                  <Globe className="h-4 w-4" />
                  Benchmark sectoriel
                </Button>
                <Button className="w-full justify-start gap-2 bg-rht-violet text-sm text-white hover:bg-rht-violet/90">
                  <Building2 className="h-4 w-4" />
                  Lancer un audit complet
                </Button>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        {/* Frameworks de conformité */}
        <FadeIn delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Referentiels de conformite
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StaggerContainer className="grid gap-4 md:grid-cols-2">
                {frameworks.map((fw) => (
                  <StaggerItem key={fw.name}>
                    <div className="rounded-xl border p-4 transition-colors hover:bg-accent/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{fw.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {fw.description}
                          </p>
                        </div>
                        <span
                          className={`text-2xl font-bold ${
                            fw.score >= 75
                              ? "text-cyber-green"
                              : fw.score >= 50
                                ? "text-rht-orange"
                                : "text-cyber-red"
                          }`}
                        >
                          {fw.score}%
                        </span>
                      </div>
                      <Progress
                        value={fw.score}
                        className="mt-3 h-2"
                      />
                      <div className="mt-3 flex gap-3 text-[11px]">
                        <span className="flex items-center gap-1 text-cyber-green">
                          <CheckCircle className="h-3 w-3" />
                          {fw.items.compliant} conformes
                        </span>
                        <span className="flex items-center gap-1 text-rht-orange">
                          <AlertTriangle className="h-3 w-3" />
                          {fw.items.partial} partiels
                        </span>
                        <span className="flex items-center gap-1 text-cyber-red">
                          <XCircle className="h-3 w-3" />
                          {fw.items.missing} manquants
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Registre des risques */}
        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Registre des risques
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {riskRegister.length} risques identifies
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="pb-3 pr-4">ID</th>
                      <th className="pb-3 pr-4">Risque</th>
                      <th className="pb-3 pr-4">Niveau</th>
                      <th className="pb-3 pr-4">Impact</th>
                      <th className="hidden pb-3 pr-4 md:table-cell">
                        Mitigation
                      </th>
                      <th className="pb-3">Responsable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {riskRegister.map((risk) => (
                      <tr key={risk.id} className="hover:bg-accent/30">
                        <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                          {risk.id}
                        </td>
                        <td className="py-3 pr-4 font-medium">{risk.risk}</td>
                        <td className="py-3 pr-4">
                          <Badge
                            className={`text-[10px] ${levelStyle[risk.level]}`}
                          >
                            {risk.level === "critical"
                              ? "Critique"
                              : risk.level === "high"
                                ? "Eleve"
                                : risk.level === "medium"
                                  ? "Moyen"
                                  : "Faible"}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-xs">{risk.impact}</td>
                        <td className="hidden py-3 pr-4 text-xs text-muted-foreground md:table-cell">
                          {risk.mitigation}
                        </td>
                        <td className="py-3 text-xs">{risk.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
