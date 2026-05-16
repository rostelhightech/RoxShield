"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Trophy,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  Flame,
  Shield,
  Crown,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";

const leaderboard = [
  { rank: 1, name: "Aminata Diallo", dept: "Comptabilité", points: 920, streak: 12, trend: "up", badges: 7 },
  { rank: 2, name: "Moussa Ndiaye", dept: "IT", points: 875, streak: 8, trend: "up", badges: 6 },
  { rank: 3, name: "Fatou Sow", dept: "IT / Sécurité", points: 810, streak: 5, trend: "stable", badges: 5, isCurrentUser: true },
  { rank: 4, name: "Ibrahima Fall", dept: "RH", points: 780, streak: 3, trend: "up", badges: 5 },
  { rank: 5, name: "Aïssatou Ba", dept: "Marketing", points: 745, streak: 6, trend: "down", badges: 4 },
  { rank: 6, name: "Ousmane Diop", dept: "Finance", points: 720, streak: 2, trend: "up", badges: 4 },
  { rank: 7, name: "Mariama Sy", dept: "Opérations", points: 695, streak: 4, trend: "stable", badges: 3 },
  { rank: 8, name: "Pape Gueye", dept: "Commercial", points: 650, streak: 0, trend: "down", badges: 3 },
  { rank: 9, name: "Khady Mbaye", dept: "Juridique", points: 620, streak: 1, trend: "up", badges: 2 },
  { rank: 10, name: "Lamine Sarr", dept: "Direction", points: 580, streak: 0, trend: "down", badges: 2 },
];

const currentUser = leaderboard.find((u) => u.isCurrentUser)!;

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-cyber-green" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-cyber-red" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

function RankDisplay({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
  if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
  return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
}

export default function LeaderboardPage() {
  return (
    <div>
      <Header title="Classement" />
      <div className="space-y-6 p-6">
        {/* Current user position */}
        <FadeIn>
          <Card className="border-cyber-green/30 bg-cyber-green/5">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-green/80 to-cyber-green">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Votre position</p>
                <p className="text-2xl font-bold">
                  {currentUser.rank}<sup className="text-sm">e</sup> / {leaderboard.length}
                </p>
              </div>
              <div className="hidden gap-6 sm:flex">
                <div className="text-center">
                  <p className="text-2xl font-bold text-rht-violet-light">{currentUser.points}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-rht-orange">{currentUser.streak}</p>
                  <p className="text-xs text-muted-foreground">Jours série</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyber-green">{currentUser.badges}</p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Podium top 3 */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-3 gap-3">
            {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, i) => {
              const order = [2, 1, 3][i];
              const heights = ["h-28", "h-36", "h-24"];
              const gradients = [
                "from-gray-300 to-gray-400",
                "from-yellow-400 to-yellow-500",
                "from-amber-500 to-amber-600",
              ];
              return (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="mb-2 h-12 w-12 border-2 border-background shadow-md">
                    <AvatarFallback className={`bg-gradient-to-br ${gradients[i]} text-sm font-bold text-white`}>
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-semibold text-center truncate w-full">{user.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-muted-foreground">{user.points} pts</p>
                  <div className={`mt-2 w-full ${heights[i]} rounded-t-xl bg-gradient-to-t ${gradients[i]} flex items-end justify-center pb-2`}>
                    <span className="text-xl font-bold text-white">{order}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>

        {/* Full ranking table */}
        <FadeIn delay={0.2}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Shield className="h-4 w-4 text-rht-violet-light" />
                Classement complet
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {leaderboard.map((user, i) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-4 px-6 py-3 transition-colors hover:bg-accent ${
                      user.isCurrentUser ? "bg-cyber-green/5 border-l-2 border-l-cyber-green" : ""
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center">
                      <RankDisplay rank={user.rank} />
                    </div>
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-gradient-to-br from-rht-violet/60 to-rht-violet-light text-[11px] text-white">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {user.name}
                          {user.isCurrentUser && (
                            <span className="ml-2 text-[10px] text-cyber-green">(vous)</span>
                          )}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">{user.dept}</p>
                    </div>
                    <div className="hidden items-center gap-1 sm:flex">
                      {user.streak > 0 && (
                        <Badge variant="outline" className="gap-1 text-[10px]">
                          <Flame className="h-3 w-3 text-rht-orange" />
                          {user.streak}j
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendIcon trend={user.trend} />
                      <span className="w-12 text-right text-sm font-semibold">{user.points}</span>
                      <span className="text-[10px] text-muted-foreground">pts</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* How points work */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Comment gagner des points ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { action: "Détecter un phishing", points: "+50", color: "text-cyber-green" },
                  { action: "Terminer une formation", points: "+30", color: "text-rht-violet-light" },
                  { action: "Série quotidienne", points: "+10/jour", color: "text-rht-orange" },
                  { action: "Obtenir un badge", points: "+100", color: "text-yellow-500" },
                ].map((item) => (
                  <div key={item.action} className="flex items-center gap-3 rounded-xl border p-3">
                    <span className={`text-lg font-bold ${item.color}`}>{item.points}</span>
                    <span className="text-sm text-muted-foreground">{item.action}</span>
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
