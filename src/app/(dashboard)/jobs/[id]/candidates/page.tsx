"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Award, Frown, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import api from "@/lib/api";
import { useJobs } from "@/hooks/useJobs";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { CandidateCard } from "@/components/candidates/candidate-card";

import { Candidate } from "@/types";

export default function JobCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatesLoading, setCandidatesLoading] = useState(true);
  const [invitingId, setInvitingId] = useState<string | null>(null);
  const params = useParams();

  const { currentJob: job, isLoading: jobLoading, fetchJobById } = useJobs();

  const fetchCandidates = useCallback(async () => {
    try {
      setCandidatesLoading(true);
      const response = await api.get<Candidate[]>(
        `/api/candidates/jobs/${params.id}/getMatchingCandidates`
      );
      setCandidates(response.data);
    } catch (error) {
      toast.error(
        "Não foi possível carregar candidatos" +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    } finally {
      setCandidatesLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchJobById(params.id as string);
      fetchCandidates();
    }
  }, [params.id, fetchJobById, fetchCandidates]);

  const handleInvite = async (candidateId: string) => {
    setInvitingId(candidateId);
    try {
      await api.post("/api/candidates/invitations", {
        jobId: params.id,
        candidateId,
      });
      toast.success("Candidato convidado com sucesso!");
      fetchCandidates();
    } catch (error) {
      toast.error(
        "Não foi possível convidar o candidato" +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    } finally {
      setInvitingId(null);
    }
  };

  const isLoading = jobLoading || candidatesLoading;

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
          className="text-blue-600 hover:underline mt-2 inline-block text-sm sm:text-base"
        >
          Voltar para vagas
        </Link>
      </div>
    );
  }

  const invitedCount = candidates.filter(c => c.invited).length;
  const averageScore =
    candidates.length > 0
      ? Math.round(
          candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length
        )
      : 0;

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <Link
        href="/jobs"
        className="inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Voltar para vagas
      </Link>

      {/* Job Info Card */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl">
            {job.title}
          </CardTitle>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base leading-relaxed">
            {job.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {job.skills.map(skill => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-xs sm:text-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <span className="text-gray-600">
                <strong>{candidates.length}</strong> candidatos encontrados
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <span className="text-gray-600">
                Score médio: <strong>{averageScore}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <span className="text-gray-600">
                <strong>{invitedCount}</strong> já convidados
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-1">
          Candidatos Compatíveis (ordenados por score)
        </h2>

        {candidates.length === 0 ? (
          <Card>
            <CardContent className="py-8 sm:py-12 text-center">
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">
                Nenhum candidato encontrado
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {candidates.map(candidate => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onInvite={handleInvite}
                isInviting={invitingId === candidate.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
