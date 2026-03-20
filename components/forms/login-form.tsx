'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signInUser } from "@/actions/auth"
import { signInSchema } from "@/lib/zod"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Link from "next/link"
import { FormSuccess } from "./forms-component/form-success"
import { FormError } from "./forms-component/form-error"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const form = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSignin = (data: z.infer<typeof signInSchema>) => {
      setLoading(true);
      setError('');
      setSuccess('');
      
      signInUser(data).then((res) => {
        setLoading(false);
        if (res.error) {
          setError(res.error);
        }
        if (res.success) {
          setSuccess(res.success);
        }
      });
    }
  

  return (
    <div className={cn("flex flex-col gap-6 max-w-2/5", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSignin)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...form.register("email")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required {...form.register("password")} />
              </Field>

              {/* Success and error messages */}
              <FormSuccess message={success} />
              <FormError message={error} />

              <Field>
                <Button className="cursor-pointer" type="submit">{loading ? "Signing in..." : "Sign In"}</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
