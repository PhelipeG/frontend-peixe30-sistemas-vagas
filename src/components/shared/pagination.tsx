import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Anterior
      </Button>

      <span className="px-4 py-2 text-sm text-gray-600">
        Página <span className="font-medium">{currentPage}</span> de{' '}
        <span className="font-medium">{totalPages}</span>
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
      >
        Próxima
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}