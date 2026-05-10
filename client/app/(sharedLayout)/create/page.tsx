"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { blogSchema } from "@/lib/validations/blog";
import type { BlogSchema } from "@/lib/validations/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import fetchApi from "@/utils/fetchApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContextProvider";

export default function CreatePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const formSubmit = async (blog: BlogSchema) => {
    if (!user) {
      toast.error("please login first to publish a blog");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await fetchApi("/api/blogs", "POST", blog);

      toast.success("blog created successfully");

      router.replace("/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create post
        </h1>
        <p className="text-xl  text-muted-foreground">
          Write and publish your blog article
        </p>
      </div>

      <Card className="max-w-2xl mx-auto border">
        <CardHeader>
          <CardTitle className="text-xl">a blog post</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    placeholder="enter title of the blog..."
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-400">{errors.title.message}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <Textarea
                    placeholder="type in your content..."
                    {...register("content")}
                    rows={5}
                  />
                  {errors.content && (
                    <p className="text-red-400">{errors.content.message}</p>
                  )}
                </Field>

                <Field className="max-w-sm">
                  <FieldLabel>Thumbnail</FieldLabel>
                  <Input type="file" />
                </Field>
              </FieldGroup>

              <div className="pt-4 flex justify-end">
                {error && <p className="text-red-400">{error}</p>}

                <Button
                  type="submit"
                  className="w-full sm:w-auto cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "publishing...." : "publish"}
                </Button>
              </div>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
