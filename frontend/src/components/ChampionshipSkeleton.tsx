import MatchCardSkeleton from "./MatchCardSkeleton";

export default function ChampionshipSkeleton() {
  return (
    <>
      <h2 className="mt-6 mb-3">Results</h2>
      <div className="grid">
        <div className="col flex flex-column justify-content-center gap-3">
          {[1, 2, 3, 4].map((key) => (
            <MatchCardSkeleton key={key} />
          ))}
        </div>
        <div className="col flex flex-column justify-content-center gap-8 col-offset-1">
          {[1, 2].map((key) => (
            <MatchCardSkeleton key={key} />
          ))}
        </div>
        <div className="col flex flex-column justify-content-center col-offset-1">
          <MatchCardSkeleton />
        </div>
      </div>
    </>
  );
}
