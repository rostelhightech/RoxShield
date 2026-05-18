"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Lock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  HardDrive,
  Mail,
  FileText,
  Cloud,
  Wifi,
  Shield,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const encryptionScore = 48;

const auditAreas = [
  {
    area: "Chiffrement des emails",
    icon: Mail,
    score: 35,
    status: "critical" as const,
    findings: [
      { text: "TLS active sur le serveur mail", ok: true },
      { text: "Chiffrement de bout en bout (S/MIME ou PGP)", ok: false },
      { text: "Politique de chiffrement des PJ sensibles", ok: false },
      { text: "Signatures numeriques configurees", ok: false },
    ],
  },
  {
    area: "Chiffrement des fichiers",
    icon: FileText,
    score: 45,
    status: "warning" as const,
    findings: [
      { text: "Documents RH chiffres", ok: true },
      { text: "Fichiers financiers proteges par MDP", ok: true },
      { text: "Politique de chiffrement des cles USB", ok: false },
      { text: "Chiffrement des exports CSV/Excel", ok: false },
    ],
  },
  {
    area: "Chiffrement des disques",
    icon: HardDrive,
    score: 62,
    status: "warning" as const,
    findings: [
      { text: "BitLocker/FileVault sur les laptops", ok: true },
      { text: "Chiffrement des serveurs de fichiers", ok: true },
      { text: "Politique BYOD avec chiffrement obligatoire", ok: false },
      { text: "Inventaire des disques non chiffres", ok: true },
    ],
  },
  {
    area: "Chiffrement cloud & transit",
    icon: Cloud,
    score: 70,
    status: "good" as const,
    findings: [
      { text: "HTTPS force sur tous les services", ok: true },
      { text: "TLS 1.3 sur les applications web", ok: true },
      { text: "VPN pour les connexions distantes", ok: true },
      { text: "Chiffrement des backups cloud", ok: false },
    ],
  },
  {
    area: "Reseau & Wi-Fi",
    icon: Wifi,
    score: 55,
    status: "warning" as const,
    findings: [
      { text: "Wi-Fi entreprise en WPA3", ok: true },
      { text: "Segmentation reseau (VLAN)", ok: true },
      { text: "Wi-Fi invite isole", ok: false },
      { text: "Detection des points d'acces rogue", ok: false },
    ],
  },
];

const statusStyle = {
  critical: { bg: "bg-cyber-red/10", text: "text-cyber-red", label: "Critique" },
  warning: { bg: "bg-rht-orange/10", text: "text-rht-orange", label: "A ameliorer" },
  good: { bg: "bg-cyber-green/10", text: "text-cyber-green", label: "Bon" },
};

const trainingModules = [
  { title: "Comprendre le chiffrement", duration: "12 min", level: "Debutant", completion: 34 },
  { title: "Chiffrer ses emails avec S/MIME", duration: "18 min", level: "Intermediaire", completion: 12 },
  { title: "Proteger ses fichiers sensibles", duration: "10 min", level: "Debutant", completion: 45 },
  { title: "VPN et connexions securisees", duration: "15 min", level: "Debutant", completion: 28 },
  { title: "Chiffrement de bout en bout", duration: "20 min", level: "Avance", completion: 8 },
];

export default function EncryptionPage() {
  return (
    <div>
      <Header title="Chiffrement & Protection des Donnees" />
      <div className="space-y-6 p-6">
        {/* Score global */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="flex flex-col items-center p-6">
                <Lock className="mb-2 h-8 w-8 text-rht-orange" />
                <p className="text-3xl font-bold text-rht-orange">{encryptionScore}/100</p>
                <p className="mt-1 text-xs text-muted-foreground">Score maturite chiffrement</p>
                <Badge className="mt-2 bg-rht-orange/10 text-rht-orange">A ameliorer</Badge>
              </CardContent>
            </Card>
            {[
              { label: "Zones auditees", value: "5/5", color: "text-cyber-green" },
              { label: "Points conformes", value: "12/20", color: "text-rht-orange" },
              { label: "Actions urgentes", value: "8", color: "text-cyber-red" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Audit par zone */}
        <FadeIn delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Audit chiffrement par zone</CardTitle>
            </CardHeader>
            <CardContent>
              <StaggerContainer className="space-y-4">
                {auditAreas.map((area) => {
                  const Icon = area.icon;
                  const style = statusStyle[area.status];
                  return (
                    <StaggerItem key={area.area}>
                      <div className="rounded-xl border p-4 transition-colors hover:bg-accent/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.bg}`}>
                              <Icon className={`h-4 w-4 ${style.text}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{area.area}</h4>
                              <Badge className={`text-[10px] ${style.bg} ${style.text}`}>
                                {style.label}
                              </Badge>
                            </div>
                          </div>
                          <span className={`text-xl font-bold ${style.text}`}>{area.score}%</span>
                        </div>
                        <Progress value={area.score} className="mt-3 h-1.5" />
                        <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {area.findings.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              {f.ok ? (
                                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-cyber-green" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5 shrink-0 text-cyber-red" />
                              )}
                              <span className={f.ok ? "text-muted-foreground" : ""}>{f.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Formations chiffrement */}
        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-rht-violet-light" />
                Formations chiffrement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trainingModules.map((mod) => (
                  <div key={mod.title} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{mod.title}</h4>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{mod.duration}</span>
                        <Badge variant="outline" className="text-[10px]">{mod.level}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-bold">{mod.completion}%</p>
                        <p className="text-[10px] text-muted-foreground">completion</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Lancer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
