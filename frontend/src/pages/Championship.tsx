import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import MatchCard from "../components/MatchCard";

const teamsInitial = [
  { name: "time 1" },
  { name: "time 2" },
  { name: "time 3" },
  { name: "time 4" },
  { name: "time 5" },
  { name: "time 6" },
  { name: "time 7" },
  { name: "time 8" },
  { name: "time 9" },
  { name: "time 10" },
];

export default function Championship() {
  const [teams, setTeams] = useState(teamsInitial);
  const [selectedTeams, setSelectedTeams] = useState();

  return (
    <div className="w-full h-full">
      <PageHeader
        title="Championship"
        subtitle="Select teams to simulate the championship"
      />
      <div className="flex flex-column gap-2 mb-5">
        <label htmlFor="add-team">Add a team</label>
        <div className="flex gap-2">
          <InputText id="add-team" />
          <Button label="Submit" />
        </div>
      </div>
      <div className="flex flex-column gap-2">
        <label htmlFor="add-team">Select teams</label>
        <div className="flex gap-2">
          <MultiSelect
            options={teams}
            value={selectedTeams}
            onChange={(e) => setSelectedTeams(e.value)}
            placeholder="Teams"
            optionLabel="name"
            maxSelectedLabels={4}
            className="w-20rem"
          />
          <Button label="Simulate" />
        </div>
      </div>

      <h2 className="mt-6 mb-3">Results</h2>
      <div className="grid">
        <div className="col flex flex-column justify-content-center gap-3">
          <MatchCard away="Time 1" awayScore={2} home="Time 2" homeScore={4} />
          <MatchCard away="Time 1" awayScore={2} home="Time 2" homeScore={4} />
          <div className="my-2"></div>
          <MatchCard away="Time 1" awayScore={2} home="Time 2" homeScore={4} />
          <MatchCard away="Time 1" awayScore={2} home="Time 2" homeScore={4} />
        </div>
        <div className="col flex flex-column justify-content-center gap-8 col-offset-1">
          <MatchCard away="Time 1" awayScore={2} home="Time 2" homeScore={4} />
          <MatchCard away="Time 1" awayScore={2} home="Time 2" homeScore={4} />
        </div>
        <div className="col flex flex-column justify-content-center col-offset-1">
          <MatchCard away="Time 1" awayScore={2} home="Time 2" homeScore={4} />
        </div>
      </div>
    </div>
  );
}
