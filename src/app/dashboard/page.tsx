"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ShieldAlert,
  Users,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  employees,
  monthlyStats,
  departmentStats,
  simulationResults,
} from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FadeIn, StaggerContainer, StaggerItem, GlowCard } from "@/components/motion";
import { ActivityFeed } from "@/components/activity-feed";
import { useTranslation } from "@/lib/i18n";

const avgRisk = Math.round(employees.reduce((acc, e) => acc + e.riskScore, 0) / employees.length);
const atRiskCount = employees.filter((e) => e.status === "at-risk").length;
const totalTrainingsCompleted = employees.reduce((acc, e) => acc + e.trainingsCompleted, 0);
const avgCompletion = Math.round((totalTrainingsCompleted / (employees.length * 10)) * 100);

function getRiskColor(score: number) {
  if (score <= 30) return "text-cyber-green";
  if (score <= 60) return "text-rht-orange";
  return "text-cyber-red";
}

function getBarColor(score: number) {
  if (score <= 30) return "#16a34a";
  if (score <= 60) return "#fa990e";
  return "#ef4444";
}

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div>
      <Header title={t("dashboard.title")} />
      <div className="space-y-6 p-6">
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <GlowCard>
              <Card className="transition-all duration-300 hover:border-rht-orange/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t("dashboard.riskScore")}</p>
                      <p className={`mt-1 text-3xl font-bold ${getRiskColor(avgRisk)}`}>{avgRisk}%</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rht-orange/10">
                      <ShieldAlert className="h-5 w-5 text-rht-orange" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-cyber-green">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    <span>-6pts ce mois</span>
                  </div>
                </CardContent>
              </Card>
            </GlowCard>
          </StaggerItem>

          <StaggerItem>
            <GlowCard>
              <Card className="transition-all duration-300 hover:border-cyber-red/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t("dashboard.atRiskEmployees")}</p>
                      <p className="mt-1 text-3xl font-bold text-cyber-red">{atRiskCount}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyber-red/10">
                      <AlertTriangle className="h-5 w-5 text-cyber-red" />
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">sur {employees.length} employés</div>
                </CardContent>
              </Card>
            </GlowCard>
          </StaggerItem>

          <StaggerItem>
            <GlowCard>
              <Card className="transition-all duration-300 hover:border-rht-violet/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t("dashboard.trainingsCompleted")}</p>
                      <p className="mt-1 text-3xl font-bold text-rht-violet-light">{avgCompletion}%</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rht-violet/10">
                      <GraduationCap className="h-5 w-5 text-rht-violet-light" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-cyber-green">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>+12% ce mois</span>
                  </div>
                </CardContent>
              </Card>
            </GlowCard>
          </StaggerItem>

          <StaggerItem>
            <GlowCard>
              <Card className="transition-all duration-300 hover:border-rht-violet/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t("dashboard.totalEmployees")}</p>
                      <p className="mt-1 text-3xl font-bold">{employees.length}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rht-violet/10">
                      <Users className="h-5 w-5 text-rht-violet" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-cyber-green">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>{employees.filter((e) => e.status === "safe").length} en zone sûre</span>
                  </div>
                </CardContent>
              </Card>
            </GlowCard>
          </StaggerItem>
        </StaggerContainer>

        <div className="grid gap-6 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{t("dashboard.riskEvolution")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyStats}>
                      <defs>
                        <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9c1e99" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#9c1e99" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "12px",
                          fontSize: "12px",
                          color: "var(--foreground)",
                        }}
                      />
                      <Area type="monotone" dataKey="riskScore" stroke="#c428c0" strokeWidth={2.5} fillOpacity={1} fill="url(#riskGradient)" name="Score de risque" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{t("dashboard.riskByDept")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentStats} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" width={85} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px", color: "var(--foreground)" }} />
                      <Bar dataKey="riskScore" radius={[0, 6, 6, 0]} name="Score de risque">
                        {departmentStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarColor(entry.riskScore)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <ActivityFeed />
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">{t("dashboard.highRiskEmployees")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employees
                    .filter((e) => e.status === "at-risk")
                    .sort((a, b) => b.riskScore - a.riskScore)
                    .map((emp) => (
                      <div key={emp.id} className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-cyber-red/10 text-xs text-cyber-red">{emp.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.department} — {emp.role}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="destructive" className="mb-1 text-[10px]">{emp.riskScore}% risque</Badge>
                          <p className="text-[10px] text-muted-foreground">{emp.trainingsCompleted}/{emp.totalTrainings} formations</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Dernières simulations de phishing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {simulationResults.map((sim) => {
                    const clickRate = Math.round((sim.clicked / sim.totalTargets) * 100);
                    return (
                      <div key={sim.id} className="space-y-2 rounded-xl border p-3 transition-colors hover:bg-accent">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{sim.campaign}</p>
                          <Badge variant="outline" className="text-[10px]">{sim.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{sim.sentDate}</span>
                          <span>{sim.totalTargets} cibles</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-cyber-red">{clickRate}% ont cliqué</span>
                            <span className="text-cyber-green">{Math.round((sim.reported / sim.totalTargets) * 100)}% ont signalé</span>
                          </div>
                          <Progress value={clickRate} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
