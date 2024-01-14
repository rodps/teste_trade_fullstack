export default function MatchCard({
  home,
  homeId,
  away,
  awayId,
  homeScore,
  awayScore,
  winnerId,
}: {
  home: string;
  homeId: number;
  away: string;
  awayId: number;
  homeScore: number;
  awayScore: number;
  winnerId: number;
}) {
  return (
    <div className="bg-white border-round shadow-1 text-sm w-15rem">
      <div
        className={`flex justify-content-between p-3 border-bottom-1 surface-border ${winnerId === homeId ? "font-bold" : ""}`}
      >
        <span>{home}</span>
        <span>{homeScore}</span>
      </div>
      <div
        className={`flex justify-content-between p-3 ${winnerId === awayId ? "font-bold" : ""}`}
      >
        <span>{away}</span>
        <span>{awayScore}</span>
      </div>
    </div>
  );
}
