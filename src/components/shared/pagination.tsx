import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="w-full sm:w-auto order-2 sm:order-1"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
        <span className="text-xs sm:text-sm">Anterior</span>
      </Button>

      <span className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 order-1 sm:order-2">
        Página <span className="font-medium">{currentPage}</span> de{" "}
        <span className="font-medium">{totalPages}</span>
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="w-full sm:w-auto order-3"
      >
        <span className="text-xs sm:text-sm">Próxima</span>
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
      </Button>
    </div>
  );
}
