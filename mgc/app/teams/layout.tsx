import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Registered | MGC Vol 8 — Violence District",
  description: "Official Team Lineup for Manis Gang Championship Vol 8: Violence District. View all 16 registered teams competing in the tournament.",
};

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
