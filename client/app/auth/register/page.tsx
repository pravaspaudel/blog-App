"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterSchema, registerSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import fetchApi from "@/utils/fetchApi";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const submitForm = async (data: RegisterSchema) => {
    try {
      const res = await fetchApi("/auth/register", "POST", data);

      toast.success("Account created successfully!");

      console.log(`got this result on calling fetchAPI: ${res}`);
      router.push("/"); // or /dashboard
    } catch (err) {
      console.log("some error while signing in", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>create an account to get stared</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Name :</FieldLabel>
                <Input
                  type="text"
                  placeholder="enter your name..."
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-400 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Email : </FieldLabel>
                <Input
                  type="email"
                  placeholder="enter your mail..."
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>Password:</FieldLabel>
                <Input
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "creating..." : "Register"}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
