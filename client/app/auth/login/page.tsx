"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchemaType } from "@/lib/validations/auth";
import fetchApi from "@/utils/fetchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const loginSubmit = async (formData: LoginSchemaType) => {
    console.log(formData);

    try {
      setLoading(true);
      const fetched = await fetchApi("/auth/login", "POST", { ...formData });

      if (!fetched.success) {
        toast.error(fetched.message ?? "something went wrong");
      }
      toast.success("logged in successfully");
      router.replace("/");
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-xl border-muted/40">
        <CardHeader>
          <CardTitle>Login to continue</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <form onSubmit={handleSubmit(loginSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    placeholder="enter your email..."
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-400">{errors.email.message}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      placeholder="******"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prevShowPass) => !prevShowPass)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400">{errors.password.message}</p>
                  )}
                </Field>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "logging in...." : "Login"}
                </Button>
              </FieldGroup>
            </form>
          </FieldSet>
        </CardContent>
      </Card>
    </div>
  );
}
