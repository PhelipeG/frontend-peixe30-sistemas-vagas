"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/lib/api";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Job } from "@/types";

const jobSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  location: z.string().min(2, "Localização é obrigatória"),
  salaryRange: z.string().min(1, "Faixa salarial é obrigatória"),
  skills: z.array(z.string()).min(1, "Adicione pelo menos uma habilidade"),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
  job?: Job;
  isEdit?: boolean;
}

export function JobForm({ job, isEdit = false }: JobFormProps) {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(job?.skills || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job?.title || "",
      description: job?.description || "",
      location: job?.location || "",
      salaryRange: job?.salaryRange || "",
      skills: job?.skills || [],
    },
  });

  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      const updatedSkills = [...skills, trimmedSkill];
      setSkills(updatedSkills);
      setValue("skills", updatedSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      if (isEdit && job) {
        await api.put(`/jobs/updateJob/${job.id}`, data);
        toast.success("Vaga atualizada com sucesso");
      } else {
        await api.post("/jobs/create", data);
        toast.success("Vaga criada com sucesso");
      }
      router.push("/jobs");
    } catch (error) {
      toast.error(
        "Ocorreu um erro" + (error instanceof Error ? `: ${error.message}` : "")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Editar Vaga" : "Nova Vaga"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Vaga *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Ex: Desenvolvedor Full Stack"
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva as responsabilidades e requisitos da vaga..."
              rows={5}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Ex: São Paulo - SP ou Remote"
              />
              {errors.location && (
                <p className="text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryRange">Faixa Salarial *</Label>
              <Input
                id="salaryRange"
                {...register("salaryRange")}
                placeholder="Ex: R$ 8.000 - R$ 12.000"
              />
              {errors.salaryRange && (
                <p className="text-sm text-red-600">
                  {errors.salaryRange.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Habilidades Requeridas *</Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Digite uma habilidade e pressione Enter"
              />
              <Button type="button" onClick={addSkill} variant="secondary">
                Adicionar
              </Button>
            </div>
            {errors.skills && (
              <p className="text-sm text-red-600">{errors.skills.message}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map(skill => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : isEdit ? (
                "Atualizar Vaga"
              ) : (
                "Criar Vaga"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/jobs")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
