"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { restaurantSchema } from "@/lib/zod"
// import { Form } from "../form"
import { useState } from "react"
import z from "zod"
import { createRestaurant } from "@/actions/restaurant"
import CardWrapper from "../auth/card-wrapper"
import { FormSuccess } from "../auth/form-success"
import { FormError } from "../auth/form-error"

export function CreateRestaurantForm() {
  const form = useForm<z.infer<typeof restaurantSchema>>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
    }
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleCreateRestaurant = (data: z.infer<typeof restaurantSchema>) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    createRestaurant(data).then((res) => {
      setLoading(false);
      console.log("Register response:", res);
      if (res.error) {
        setError(res.error);
      }
      if (res.success) {
        setSuccess(res.success);
      }
    });
  }

  return (
    <CardWrapper
      headerLabel="Create your Restaurant"
      title="Register Restaurant"
      backButtonLabel="Back to Home"
      backButtonHref="/"
      showSocial
    >
      <form onSubmit={form.handleSubmit(handleCreateRestaurant)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Restaurant Name</FieldLabel>
            <Input 
              id="name" 
              type="text" 
              placeholder="e.g. Joe's Diner" 
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </Field>
          
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input
              id="description"
              type="text"
              placeholder="A brief description of your restaurant"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
            )}
            <FieldDescription>
              We will use this to provide more information about your restaurant.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              type="text"
              placeholder="e.g. New York, NY"
              {...form.register("location")}
            />
            {form.formState.errors.location && (
              <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
            )}
            <FieldDescription>
              We will use this to provide more information about your restaurant.
            </FieldDescription>
          </Field>

          
          <FormSuccess message={success} />
          <FormError message={error} />
          
          <Button className="cursor-pointer" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Restaurant"}
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  )
}