import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import MatchCard from "../components/MatchCard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import axiosClient from "../libs/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorHelper from "../components/InputErrorHelper";
import { toast } from "react-toastify";

// const teams = [{ name: "Team 1" }, { name: "Team 2" }, { name: "Team 3" }];

type TeamForm = {
  name: string;
};

export default function Championship() {
  const [selectedTeams, setSelectedTeams] = useState();

  const { data: teamsData } = useQuery({
    queryKey: ["teams"],
    queryFn: () => axiosClient.get("/teams").then((res) => res.data),
    onError: () => {
      toast.error("Error fetching teams");
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation<any, AxiosError, TeamForm>({
    mutationFn: (data: TeamForm) => axiosClient.post("/teams", data),
    onSuccess: () => {
      toast.success("Team added successfully");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (error) => {
      const errorData = error.response?.data as any;
      toast.error(errorData.error);
    },
  });

  const {
    register: registerTeam,
    handleSubmit: handleTeamSubmit,
    formState: { errors: teamErrors },
  } = useForm<TeamForm>();

  const onTeamSubmit: SubmitHandler<TeamForm> = (data: TeamForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full h-full">
      <PageHeader
        title="Championship"
        subtitle="Select teams to simulate the championship"
      />
      <form onSubmit={handleTeamSubmit(onTeamSubmit)}>
        <div className="flex flex-column gap-2 mb-5">
          <label htmlFor="add-team">Add a team</label>
          <div className="flex gap-2">
            <InputText
              id="add-team"
              {...registerTeam("name", {
                required: { value: true, message: "Team name is required" },
              })}
            />
            {teamErrors.name && (
              <InputErrorHelper error={teamErrors.name.message!} />
            )}
            <Button label="Submit" loading={mutation.isLoading} />
          </div>
        </div>
      </form>
      <div className="flex flex-column gap-2">
        <label htmlFor="add-team">Select teams</label>
        <div className="flex gap-2">
          <MultiSelect
            options={teamsData?.teams}
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
