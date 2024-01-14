import { Skeleton } from "primereact/skeleton";

export default function MatchCardSkeleton() {
  return (
    <div className="bg-white border-round shadow-1 text-sm w-15rem">
      <div className={`flex p-3 border-bottom-1 surface-border`}>
        <Skeleton />
      </div>
      <div className={`flex p-3`}>
        <Skeleton />
      </div>
    </div>
  );
}
