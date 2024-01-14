import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import axiosClient from "../libs/axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputErrorHelper from "../components/InputErrorHelper";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import ChampionshipResult from "../components/ChampionshipResult";
import ChampionshipSkeleton from "../components/ChampionshipSkeleton";

type TeamForm = {
  name: string;
};

export default function Championship() {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: championship,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["championship", id],
    queryFn: () =>
      axiosClient
        .get(`/championships/${id}`)
        .then((res) => res.data.championship),
    onError: () => {
      toast.error("Error fetching championship");
    },
    enabled: !!id,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const { data: teamsData } = useQuery({
    queryKey: ["teams"],
    queryFn: () => axiosClient.get("/teams").then((res) => res.data),
    onError: () => {
      toast.error("Error fetching teams");
    },
  });

  const queryClient = useQueryClient();
  const teamMutation = useMutation<any, AxiosError, TeamForm>({
    mutationFn: (data: TeamForm) => axiosClient.post("/teams", data),
    onSuccess: (data) => {
      toast.success("Team added successfully");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (error) => {
      const errorData = error.response?.data as any;
      toast.error(errorData.error);
    },
  });

  const championshipMutation = useMutation<any, AxiosError, any>({
    mutationFn: (data: any) =>
      axiosClient.post("/championships/simulate", data),
    onSuccess: (data) => {
      toast.success("Championship simulated successfully");
      setSearchParams({ id: data.data.championship.id });
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
    reset: resetTeam,
  } = useForm<TeamForm>();

  const {
    control,
    handleSubmit: handleChampionshipSubmit,
    formState: { errors: championshipErrors },
  } = useForm();

  const onTeamSubmit: SubmitHandler<TeamForm> = (data: TeamForm) => {
    teamMutation.mutate(data);
    resetTeam();
  };

  const onChampionshipSubmit = (data: any) => {
    if (data.teams.length !== 8) {
      toast.error("You must select 8 teams");
      return;
    }
    const teamsId = data.teams.map((t: any) => t.id);
    championshipMutation.mutate({ teams: teamsId });
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
              className={teamErrors.name && "p-invalid"}
              {...registerTeam("name", {
                required: { value: true, message: "Team name is required" },
                minLength: {
                  value: 3,
                  message: "Team name must be at least 3 characters",
                },
              })}
            />
            <Button label="Submit" loading={teamMutation.isLoading} />
          </div>
          {teamErrors.name && (
            <InputErrorHelper error={teamErrors.name.message!} />
          )}
        </div>
      </form>

      <form onSubmit={handleChampionshipSubmit(onChampionshipSubmit)}>
        <div className="flex flex-column gap-2">
          <label htmlFor="add-team">Select teams</label>
          <div className="flex gap-2">
            <Controller
              name="teams"
              control={control}
              rules={{
                required: "Teams are required.",
              }}
              render={({ field }) => (
                <MultiSelect
                  id={field.name}
                  name="teams"
                  value={field.value}
                  options={teamsData?.teams}
                  onChange={(e) => field.onChange(e.value)}
                  optionLabel="name"
                  placeholder="Select Teams"
                  maxSelectedLabels={4}
                  className={`w-20rem ${
                    championshipErrors.teams && "p-invalid"
                  }`}
                />
              )}
            />
            <Button label="Simulate" loading={championshipMutation.isLoading} />
          </div>
          {championshipErrors.teams && (
            <InputErrorHelper
              error={championshipErrors.teams.message! as string}
            />
          )}
        </div>
      </form>

      {isLoading && <ChampionshipSkeleton />}
      {championship && <ChampionshipResult championship={championship} />}
    </div>
  );
}
