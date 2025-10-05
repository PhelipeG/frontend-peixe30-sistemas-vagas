"use client";

import { ArrowLeft } from "lucide-react";

import Link from "next/link";

import { JobForm } from "@/components/jobs/job-form";

export default function NewJobPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/jobs"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para vagas
      </Link>

      <JobForm />
    </div>
  );
}
