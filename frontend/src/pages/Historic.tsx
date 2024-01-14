import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import axiosClient from "../libs/axios";
import { useQuery } from "react-query";
import MatchCard from "../components/MatchCard";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Paginator } from "primereact/paginator";

export default function Historic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { data: championships, refetch } = useQuery({
    queryKey: ["championships"],
    queryFn: () =>
      axiosClient
        .get("/championships", { params: { page: page ?? 1 } })
        .then((res) => {
          const totalRecords = res.data.totalRecords;
          const historic = res.data.championships.map((c: any) => {
            return {
              ...c,
              matches: c.matches.filter(
                (m: any) =>
                  m.teamHomeId === c.winnerId || m.teamGuestId === c.winnerId,
              ),
            };
          });
          return { historic, totalRecords };
        }),
    onError: () => {
      toast.error("Error fetching championships");
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
      <div>
        <ul className="list-none p-0">
          {championships?.historic.map((c: any) => (
            <li key={c.id} className="mb-5">
              <Link
                to={`/championship?id=${c.id}`}
                className="no-underline text-900"
              >
                <h3 className="mb-1">Championship #{c.id}</h3>
              </Link>
              <p className="mb-1 text-600 text-sm">
                📅 Date: {new Date(c.createdAt).toLocaleString()}
              </p>
              <p className="mb-4 text-600 text-sm">
                🎉 Winner: <strong>{c.winner.name}</strong>
              </p>
              <div className="flex gap-8">
                {c.matches.map((m: any) => (
                  <MatchCard
                    key={m.id}
                    home={m.teamHome.name}
                    homeId={m.teamHomeId}
                    away={m.teamGuest.name}
                    awayId={m.teamGuestId}
                    homeScore={m.teamHomeGoals}
                    awayScore={m.teamGuestGoals}
                    winnerId={m.winnerId}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Paginator
        totalRecords={championships?.totalRecords}
        first={10 * Number(page ?? 1) - 1}
        onPageChange={(e) => {
          setSearchParams({ page: (e.page + 1).toString() });
        }}
        rows={10}
      />
    </div>
  );
}
