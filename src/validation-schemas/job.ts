import * as z from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  location: z.string().min(2, "Localização é obrigatória"),
  salaryRange: z.string().min(1, "Faixa salarial é obrigatória"),
  skills: z.array(z.string()).min(1, "Adicione pelo menos uma habilidade"),
});

export type JobFormData = z.infer<typeof jobSchema>;