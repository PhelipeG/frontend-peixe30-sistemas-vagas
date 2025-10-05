import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Job, PaginatedResponse, CreateJobData, UpdateJobData } from '@/types';

interface UseJobsOptions {
  initialPage?: number;
  initialLimit?: number;
}

interface UseJobsReturn {
  // Estados
  jobs: Job[];
  currentJob: Job | null;
  isLoading: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  page: number;
  totalPages: number;
  total: number;

  // Ações
  fetchJobs: (page?: number) => Promise<void>;
  fetchJobById: (id: string) => Promise<Job | null>;
  createJob: (data: CreateJobData) => Promise<Job | null>;
  updateJob: (id: string, data: UpdateJobData) => Promise<Job | null>;
  deleteJob: (id: string) => Promise<boolean>;
  setPage: (page: number) => void;
  clearCurrentJob: () => void;
  refreshCurrentPage: () => Promise<void>;
}

export function useJobs(options: UseJobsOptions = {}): UseJobsReturn {
  const { initialPage = 1, initialLimit = 10 } = options;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPageState] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(initialLimit);


  const fetchJobs = useCallback(async (targetPage?: number) => {
    try {
      setIsLoading(true);
      const currentPage = targetPage ?? page;
      
      const response = await api.get<PaginatedResponse<Job>>('/jobs/all', {
        params: { page: currentPage, limit },
      });

      setJobs(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
      
      if (targetPage !== undefined) {
        setPageState(targetPage);
      }
    } catch (error) {
      toast.error(
        'Erro ao carregar vagas' +
          (error instanceof Error ? `: ${error.message}` : '')
      );
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);
  const fetchJobById = useCallback(async (id: string): Promise<Job | null> => {
    try {
      setIsLoading(true);
      const response = await api.get<Job>(`/jobs/${id}`);
      const job = response.data;
      setCurrentJob(job);
      return job;
    } catch (error) {
      toast.error(
        'Erro ao carregar vaga' +
          (error instanceof Error ? `: ${error.message}` : '')
      );
      setCurrentJob(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const createJob = useCallback(async (data: CreateJobData): Promise<Job | null> => {
    try {
      setIsSubmitting(true);
      const response = await api.post<Job>('/jobs/create', data);
      const newJob = response.data;
      
      toast.success('Vaga criada com sucesso!');
      if (page === 1) {
        setJobs(prevJobs => [newJob, ...prevJobs.slice(0, limit - 1)]);
      }
      
      return newJob;
    } catch (error) {
      toast.error(
        'Erro ao criar vaga' +
          (error instanceof Error ? `: ${error.message}` : '')
      );
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [page, limit]);
  const updateJob = useCallback(async (id: string, data: UpdateJobData): Promise<Job | null> => {
    try {
      setIsSubmitting(true);
      const response = await api.put<Job>(`/jobs/updateJob/${id}`, data);
      const updatedJob = response.data;
      
      toast.success('Vaga atualizada com sucesso!');

      setJobs(prevJobs =>
        prevJobs.map(job => (job.id === id ? updatedJob : job))
      );
      
      if (currentJob?.id === id) {
        setCurrentJob(updatedJob);
      }
      
      return updatedJob;
    } catch (error) {
      toast.error(
        'Erro ao atualizar vaga' +
          (error instanceof Error ? `: ${error.message}` : '')
      );
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [currentJob?.id]);
  const deleteJob = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsDeleting(true);
      await api.delete(`/jobs/deleteJob/${id}`);
      
      toast.success('Vaga deletada com sucesso!');

      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      
      if (currentJob?.id === id) {
        setCurrentJob(null);
      }
      
      // Se a página atual ficou vazia e não é a primeira, voltar uma página
      const remainingJobs = jobs.filter(job => job.id !== id);
      if (remainingJobs.length === 0 && page > 1) {
        const newPage = page - 1;
        setPageState(newPage);
        await fetchJobs(newPage);
      }
      
      return true;
    } catch (error) {
      toast.error(
        'Erro ao deletar vaga' +
          (error instanceof Error ? `: ${error.message}` : '')
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [currentJob?.id, jobs, page, fetchJobs]);

  // Alterar página
  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  // Limpar vaga atual
  const clearCurrentJob = useCallback(() => {
    setCurrentJob(null);
  }, []);

  // Atualizar página atual
  const refreshCurrentPage = useCallback(async () => {
    await fetchJobs(page);
  }, [fetchJobs, page]);

  return {
    // Estados
    jobs,
    currentJob,
    isLoading,
    isSubmitting,
    isDeleting,
    page,
    totalPages,
    total,

    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
    setPage,
    clearCurrentJob,
    refreshCurrentPage,
  };
}
