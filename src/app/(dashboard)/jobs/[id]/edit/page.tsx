"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Job } from "@/types";
import { JobForm } from "@/components/jobs/job-form";
import { ArrowLeft, Frown} from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

export default function EditJobPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get<Job>(`/jobs/${params.id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] sm:min-h-[400px]">
        <Spinner className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <Frown className="w-16 h-16 sm:w-32 sm:h-32 text-gray-500 mx-auto" />
        <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-4">Vaga não encontrada</p>
        <Link
          href="/jobs"
          className="text-blue-600 hover:text-blue-900 mt-2 inline-block text-sm sm:text-base"
        >
          Voltar para vagas
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <Link
        href="/jobs"
        className="inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Voltar para vagas
      </Link>

      <div className="w-full max-w-4xl mx-auto">
        <JobForm job={job} isEdit />
      </div>
    </div>
  );
}
