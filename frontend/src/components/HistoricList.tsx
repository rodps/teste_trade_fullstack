import { Link } from "react-router-dom";

export default function HistoricList({ historic }: { historic: any }) {
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
}
