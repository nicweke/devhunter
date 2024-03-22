"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createRoomAction } from "./actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  githubRepo: z.string().min(1).max(250),
  tags: z.string().min(1).max(50),
});

export function CreateRoomForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //invoke server action to store the data in our database
    await createRoomAction(values);
    return router.push("/");
  }

  return (
    <div className="py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="NextDev Room" />
                </FormControl>
                <FormDescription>Enter name of your room...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a description of what you will be developing here..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  Provide a description of what you will be developing here...
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Repository Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://github.com/nicweke/devhunter"
                  />
                </FormControl>
                <FormDescription>
                  Enter the github link to the project you are working on...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="typescirpt, tailwind, next js"
                  />
                </FormControl>
                <FormDescription>
                  List your programming languages, frameworks and libraries...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
