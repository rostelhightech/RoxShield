"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mail,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingDown,
  Users,
  FileWarning,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const emailScore = 68;

const threatTypes = [
  { name: "Phishing", count: 142, blocked: 128, color: "#ef4444" },
  { name: "Spear Phishing", count: 23, blocked: 18, color: "#fa990e" },
  { name: "BEC", count: 8, blocked: 6, color: "#9c1e99" },
  { name: "Spoofing", count: 34, blocked: 31, color: "#c428c0" },
  { name: "Malware", count: 19, blocked: 17, color: "#ef4444" },
];

const departmentData = [
  { dept: "Finance", score: 45, incidents: 12 },
  { dept: "RH", score: 62, incidents: 7 },
  { dept: "IT", score: 85, incidents: 2 },
  { dept: "Direction", score: 38, incidents: 15 },
  { dept: "Commercial", score: 55, incidents: 9 },
  { dept: "Juridique", score: 72, incidents: 4 },
];

const recentIncidents = [
  { date: "17 Mai", type: "BEC", target: "CFO", status: "bloque", dept: "Finance" },
  { date: "16 Mai", type: "Spear Phishing", target: "DRH", status: "clique", dept: "RH" },
  { date: "15 Mai", type: "Malware (PJ)", target: "3 employes", status: "bloque", dept: "Commercial" },
  { date: "14 Mai", type: "Spoofing PDG", target: "Comptabilite", status: "signale", dept: "Finance" },
  { date: "13 Mai", type: "Phishing MoMo", target: "5 employes", status: "bloque", dept: "Operations" },
];

function getBarColor(score: number) {
  if (score >= 70) return "#16a34a";
  if (score >= 50) return "#fa990e";
  return "#ef4444";
}

export default function EmailSecurityPage() {
  return (
    <div>
      <Header title="Securite Email" />
      <div className="space-y-6 p-6">
        {/* Stats */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Score securite email", value: `${emailScore}/100`, icon: Mail, color: "text-rht-violet-light", badge: "Intermediaire" },
              { label: "Menaces bloquees", value: "200/226", icon: ShieldAlert, color: "text-cyber-green", badge: "88.5%" },
              { label: "Employes a risque", value: "12", icon: Users, color: "text-cyber-red", badge: "sur 45" },
              { label: "Tendance", value: "-23%", icon: TrendingDown, color: "text-cyber-green", badge: "vs mois dernier" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rht-violet/10">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.badge}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Types de menaces */}
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Types de menaces detectees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatTypes.map((threat) => (
                    <div key={threat.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{threat.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {threat.blocked}/{threat.count} bloques
                        </span>
                      </div>
                      <div className="mt-1.5 flex gap-1">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(threat.blocked / threat.count) * 100}%`,
                            backgroundColor: "#16a34a",
                          }}
                        />
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${((threat.count - threat.blocked) / threat.count) * 100}%`,
                            backgroundColor: threat.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Score par département */}
          <FadeIn delay={0.15}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Score email par departement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {departmentData.map((entry, i) => (
                          <Cell key={i} fill={getBarColor(entry.score)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Incidents récents */}
        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Incidents recents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="pb-3 pr-4">Date</th>
                      <th className="pb-3 pr-4">Type</th>
                      <th className="pb-3 pr-4">Cible</th>
                      <th className="pb-3 pr-4">Departement</th>
                      <th className="pb-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentIncidents.map((inc, i) => (
                      <tr key={i} className="hover:bg-accent/30">
                        <td className="py-3 pr-4 text-xs text-muted-foreground">{inc.date}</td>
                        <td className="py-3 pr-4 font-medium">{inc.type}</td>
                        <td className="py-3 pr-4 text-xs">{inc.target}</td>
                        <td className="py-3 pr-4 text-xs">{inc.dept}</td>
                        <td className="py-3">
                          <Badge className={`text-[10px] ${
                            inc.status === "bloque" ? "bg-cyber-green/10 text-cyber-green"
                            : inc.status === "signale" ? "bg-rht-orange/10 text-rht-orange"
                            : "bg-cyber-red/10 text-cyber-red"
                          }`}>
                            {inc.status === "bloque" ? "Bloque" : inc.status === "signale" ? "Signale" : "Clique"}
                          </Badge>
                        </td>
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
