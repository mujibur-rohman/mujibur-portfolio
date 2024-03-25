"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/route.config";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function GatePage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full md:max-w-[50vw] xl:max-w-[30vw] max-xl:max-w-[500px] border rounded-md p-3">
        <div className="flex justify-center mb-5 border-b pb-3">
          <span className="text-primary font-bold text-xl">Login</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 border-b pb-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="!mt-4">
              Login
            </Button>
          </form>
        </Form>
        <div className="flex justify-center pt-3">
          <span className="text-primary font-bold text-4xl">&apos;M&apos;</span>
        </div>
      </div>
    </div>
  );
}

export default GatePage;
