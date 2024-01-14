import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import axiosClient from "../libs/axios";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Paginator } from "primereact/paginator";
import HistoricList from "../components/HistoricList";
import HistoricSkeleton from "../components/HistoricSkeleton";

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
