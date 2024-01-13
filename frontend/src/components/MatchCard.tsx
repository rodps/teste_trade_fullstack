export default function MatchCard({
  home,
  away,
  homeScore,
  awayScore,
}: {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
}) {
  return (
    <div className="bg-white border-round shadow-1 text-sm w-15rem">
      <div className="flex justify-content-between p-3 border-bottom-1 surface-border">
        <span>{home}</span>
        <span>{homeScore}</span>
      </div>
      <div className="flex justify-content-between p-3">
        <span>{away}</span>
        <span>{awayScore}</span>
      </div>
    </div>
  );
}
