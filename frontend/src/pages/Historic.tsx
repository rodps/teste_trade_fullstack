import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import axiosClient from "../libs/axios";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";

const HistoricSkeleton = () => {
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
};

const HistoricList = ({ historic }: { historic: any }) => {
  return (
    <ul className="list-none p-0">
      {historic?.historic.map((c: any) => (
        <li key={c.id} className="mb-5">
          <Link
            to={`/championship?id=${c.id}`}
            className="no-underline text-900"
          >
            <h3 className="mb-1">Championship #{c.id}</h3>
          </Link>
          <p className="mb-3 text-600 text-sm">
            📅 Date: {new Date(c.createdAt).toLocaleString()}
          </p>
          <div className="flex justify-content-between">
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <p className="font-bold mb-3">🥇 First Place</p>
              <p>{c.first.name}</p>
            </div>
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <p className="font-bold mb-3">🥈 Second Place</p>
              <p>{c.second.name}</p>
            </div>
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <p className="font-bold mb-3">🥉 Third Place</p>
              <p>{c.third.name}</p>
            </div>
            <div className="bg-white border-round shadow-1 text-sm w-15rem p-3">
              <p className="font-bold mb-3">⚽ Fourth Place</p>
              <p>{c.fourth.name}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default function Historic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const {
    data: historic,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["historic"],
    queryFn: () =>
      axiosClient
        .get("/historic", { params: { page: page ?? 1 } })
        .then((res) => res.data),
    onError: () => {
      toast.error("Error fetching historic");
    },
  });

  useEffect(() => {
    if (page) {
      refetch();
    }
  }, [refetch, page]);

  return (
    <div className="w-full h-full">
      <PageHeader title="Historic" subtitle="Historic of the championships" />
      {!isLoading ? <HistoricList historic={historic} /> : <HistoricSkeleton />}
      <Paginator
        totalRecords={historic?.totalRecords}
        first={10 * Number(page ?? 1) - 1}
        onPageChange={(e) => {
          setSearchParams({ page: (e.page + 1).toString() });
        }}
        rows={10}
      />
    </div>
  );
}
