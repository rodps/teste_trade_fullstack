import MatchCard from "./MatchCard";

export default function ChampionshipResult({
  championship,
}: {
  championship: any;
}) {
  return (
    <>
      <h2 className="mt-6 mb-3">Results</h2>
      <div className="grid">
        <div className="col flex flex-column justify-content-center gap-3">
          {championship.matches.slice(0, 4).map((match: any, index: number) => (
            <MatchCard
              key={index}
              home={match.teamHome.name}
              homeId={match.teamHomeId}
              homeScore={match.teamHomeGoals}
              away={match.teamGuest.name}
              awayId={match.teamGuestId}
              awayScore={match.teamGuestGoals}
              winnerId={match.winnerId}
            />
          ))}
        </div>
        <div className="col flex flex-column justify-content-center gap-8 col-offset-1">
          {championship.matches.slice(4, 6).map((match: any, index: number) => (
            <MatchCard
              key={index + 4}
              home={match.teamHome.name}
              homeId={match.teamHomeId}
              homeScore={match.teamHomeGoals}
              away={match.teamGuest.name}
              awayId={match.teamGuestId}
              awayScore={match.teamGuestGoals}
              winnerId={match.winnerId}
            />
          ))}
        </div>
        <div className="col flex flex-column justify-content-center col-offset-1">
          <MatchCard
            home={championship.matches[6].teamHome.name}
            homeId={championship.matches[6].teamHomeId}
            homeScore={championship.matches[6].teamHomeGoals}
            away={championship.matches[6].teamGuest.name}
            awayId={championship.matches[6].teamGuestId}
            awayScore={championship.matches[6].teamGuestGoals}
            winnerId={championship.matches[6].winnerId}
          />
        </div>
      </div>
    </>
  );
}
