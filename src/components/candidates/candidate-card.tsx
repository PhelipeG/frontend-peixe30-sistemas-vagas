import { Award, Briefcase, CheckCircle, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Candidate } from "@/types";

interface CandidateCardProps {
  candidate: Candidate;
  onInvite: (candidateId: string) => void;
  isInviting: boolean;
}

export function CandidateCard({
  candidate,
  onInvite,
  isInviting,
}: CandidateCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 40) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente Match";
    if (score >= 60) return "Bom Match";
    if (score >= 40) return "Match Moderado";
    return "Match Baixo";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{candidate.name}</CardTitle>
          <div
            className={`px-3 py-1 rounded-full border-2 ${getScoreColor(candidate.score)}`}
          >
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span className="font-bold">{candidate.score}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {getScoreLabel(candidate.score)}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          {candidate.email}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="w-4 h-4 mr-2" />
          {candidate.experienceYears}{" "}
          {candidate.experienceYears === 1 ? "ano" : "anos"} de experiência
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Habilidades:</p>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map(skill => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {candidate.invited ? (
          <Button variant="outline" disabled className="w-full">
            <CheckCircle className="w-4 h-4 mr-2" />
            Já Convidado
          </Button>
        ) : (
          <Button
            onClick={() => onInvite(candidate.id)}
            disabled={isInviting}
            className="w-full"
          >
            {isInviting ? "Convidando..." : "Convidar Candidato"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
