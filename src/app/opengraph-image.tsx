import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RoxShield - Human Security Training Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1030 50%, #0a0a0f 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(156,30,153,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(250,153,14,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Shield icon */}
        <div
          style={{
            display: "flex",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #9c1e99, #c428c0)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            boxShadow: "0 0 60px rgba(156,30,153,0.4)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 6v5c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z"
              fill="white"
              opacity="0.9"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="#9c1e99"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 56, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
            Rox
          </span>
          <span style={{ fontSize: 56, color: "white", fontWeight: 700 }}>Shield</span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            marginTop: 12,
          }}
        >
          Human Security Training Platform
        </p>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 32,
            fontSize: 16,
            color: "#25d366",
          }}
        >
          <span>Phishing Simulation</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span>Formation</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span>Risk Scoring</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span>Gamification</span>
        </div>

        {/* Footer */}
        <p
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 14,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Par Rostel High-Tech — rostelhightech.com
        </p>
      </div>
    ),
    { ...size }
  );
}
