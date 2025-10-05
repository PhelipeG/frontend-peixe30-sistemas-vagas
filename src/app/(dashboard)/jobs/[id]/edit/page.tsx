"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Frown } from "lucide-react";
import Link from "next/link";

import { useJobs } from "@/hooks/useJobs";

import { Spinner } from "@/components/ui/spinner";
import { JobForm } from "@/components/jobs/job-form";

export default function EditJobPage() {
  const params = useParams();
  
  const {
    currentJob: job,
    isLoading,
    fetchJobById,
  } = useJobs();

  useEffect(() => {
    if (params.id) {
      fetchJobById(params.id as string);
    }
  }, [params.id, fetchJobById]);

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
        <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-4">
          Vaga não encontrada
        </p>
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
