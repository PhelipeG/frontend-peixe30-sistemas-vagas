"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "../../../../public/icon.png";
import { LoginForm } from "@/components/auth/login-form";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3198D3] p-4">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="space-y-1 text-center pb-4 sm:pb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-600 p-2 sm:p-3 rounded-full">
              <Image 
                src={logo} 
                alt="Logo" 
                width={24} 
                height={24}
                className="sm:w-8 sm:h-8"
              />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">Peixe 30</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Entre com suas credenciais para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
