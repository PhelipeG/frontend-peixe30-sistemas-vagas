'use client';

import { useEffect, useState, useMemo } from 'react';
import { Users, MapPin, Calendar, Award } from 'lucide-react';
import { toast } from 'sonner';

import api from '@/lib/api';

import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/components/ui/search-input';

import { Candidate } from '@/types';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Candidate[]>('/candidates/all');
        setCandidates(response.data);
      } catch (error) {
        toast.error(
          'Erro ao carregar candidatos' +
            (error instanceof Error ? `: ${error.message}` : '')
        );
        setCandidates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Filtrar candidatos por nome
  const filteredCandidates = useMemo(() => {
    if (!searchTerm.trim()) return candidates;
    
    return candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [candidates, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] sm:min-h-[400px]">
        <Spinner className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Candidatos</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Gerencie todos os candidatos cadastrados
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>
            <strong>{filteredCandidates.length}</strong> candidatos
            {searchTerm && ` encontrados para "${searchTerm}"`}
          </span>
        </div>
      </div>

      {/* Busca */}
      <div className="w-full max-w-md">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar candidatos por nome..."
          className="w-full"
        />
      </div>

      {/* Lista de Candidatos */}
      {filteredCandidates.length === 0 ? (
        <Card>
          <CardContent className="py-8 sm:py-12 text-center">
            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            {searchTerm ? (
              <>
                <p className="text-gray-500 text-base sm:text-lg mb-2">
                  Nenhum candidato encontrado
                </p>
                <p className="text-gray-400 text-sm">
                  Tente buscar com outros termos
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-base sm:text-lg">
                Nenhum candidato cadastrado
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 truncate">
          {candidate.name}
        </CardTitle>
        <p className="text-sm text-gray-600 truncate">{candidate.email}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Experiência */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>
            {candidate.experienceYears} {candidate.experienceYears === 1 ? 'ano' : 'anos'} de experiência
          </span>
        </div>

        {/* Score (se disponível) */}
        {candidate.score !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 flex-shrink-0 text-gray-600" />
            <span className="text-gray-600">Score:</span>
            <Badge 
              variant={candidate.score >= 80 ? 'default' : candidate.score >= 60 ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {candidate.score}%
            </Badge>
          </div>
        )}

        {/* Skills */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Habilidades:</p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Status de convite */}
        {candidate.invited && (
          <div className="pt-2 border-t">
            <Badge variant="secondary" className="text-xs">
              ✓ Já convidado
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
