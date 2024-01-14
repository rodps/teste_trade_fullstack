import { Skeleton } from "primereact/skeleton";

export default function HistoricSkeleton() {
  return (
    <ul className="list-none p-0">
      {[1, 2, 3, 4, 5].map((key) => (
        <li key={key} className="mb-5">
          <Skeleton className="w-12rem mb-2" />
          <Skeleton className="w-15rem mb-4" />
          <div className="flex justify-content-between">
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <Skeleton className="mb-3" />
              <Skeleton />
            </div>
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <Skeleton className="mb-3" />
              <Skeleton />
            </div>
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <Skeleton className="mb-3" />
              <Skeleton />
            </div>
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <Skeleton className="mb-3" />
              <Skeleton />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
