import { Job } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign, Pencil, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
  onDelete: (id: string) => void;
}

export function JobCard({ job, onDelete }: JobCardProps) {
  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{job.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">
          {truncateDescription(job.description)}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            {job.salaryRange}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(job.createdAt), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Button asChild className='bg-blue-600 text-white hover:bg-blue-700' size="sm">
          <Link href={`/jobs/${job.id}/candidates`}>
            <Users className="w-4 h-4 mr-2" />
            Ver Match
          </Link>
        </Button>
        <Button asChild  size="sm">
          <Link href={`/jobs/${job.id}/edit`}>
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(job.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Deletar
        </Button>
      </CardFooter>
    </Card>
  );
}