import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import axiosClient from "../libs/axios";
import { useQuery } from "react-query";
import MatchCard from "../components/MatchCard";
import { Link } from "react-router-dom";

export default function Historic() {
  const { data: championships } = useQuery({
    queryKey: ["championships"],
    queryFn: () =>
      axiosClient.get("/championships").then((res) => {
        const historic = res.data.championships.map((c: any) => {
          return {
            ...c,
            matches: c.matches.filter(
              (m: any) =>
                m.teamHomeId === c.winnerId || m.teamGuestId === c.winnerId,
            ),
          };
        });
        return historic;
      }),
    onError: () => {
      toast.error("Error fetching championships");
    },
  });

  return (
    <div className="w-full h-full">
      <PageHeader title="Historic" subtitle="Historic of the championships" />
      <div>
        <ul className="list-none p-0">
          {championships?.map((c: any) => (
            <li key={c.id} className="mb-5">
              <Link
                to={`/championship?id=${c.id}`}
                className="no-underline text-900"
              >
                <h3 className="mb-1">Championship #{c.id}</h3>
              </Link>
              <p className="mb-4 text-600 text-sm">
                Date: {new Date(c.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-8">
                {c.matches.map((m: any) => (
                  <MatchCard
                    key={m.id}
                    home={m.teamHome.name}
                    away={m.teamGuest.name}
                    homeScore={m.teamHomeGoals}
                    awayScore={m.teamGuestGoals}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
