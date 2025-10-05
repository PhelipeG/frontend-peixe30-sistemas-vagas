"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/lib/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { JobCard } from "@/components/jobs/job-card";
import { Pagination } from "@/components/shared/pagination";

import { Job, PaginatedResponse } from "@/types";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const router = useRouter();

  const fetchJobs = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await api.get<PaginatedResponse<Job>>("/jobs/all", {
        params: { page: currentPage, limit: 10 },
      });
      setJobs(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(
        "Erro ao carregar vagas" +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handleDelete = async () => {
    if (!jobToDelete) return;

    try {
      await api.delete(`/jobs/deleteJob/${jobToDelete}`);
      toast.success("Vaga deletada com sucesso");
      fetchJobs(page);
    } catch (error) {
      toast.error(
        "Erro ao deletar a vaga" +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    } finally {
      setJobToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] sm:min-h-[400px]">
        <Spinner className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Vagas
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Gerencie as vagas disponíveis
          </p>
        </div>
        <Button
          onClick={() => router.push("/jobs/new")}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Vaga
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <p className="text-gray-500 text-base sm:text-lg">
            Nenhuma vaga cadastrada
          </p>
          <Button
            onClick={() => router.push("/jobs/new")}
            className="mt-4 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeira Vaga
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {jobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={id => setJobToDelete(id)}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <AlertDialog
        open={!!jobToDelete}
        onOpenChange={() => setJobToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta vaga? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
