'use server';
import { prisma } from "@/lib/prisma";
import z from "zod";
import { restaurantSchema } from "@/lib/zod";
import { getAuthSession } from "@/lib/utils";



export const createRestaurant = async (data: z.infer<typeof restaurantSchema>) => {
  try {
    const validatedData = restaurantSchema.parse(data);
    const restaurantData = validatedData;

    const session = await getAuthSession();

    if (!session?.user?.id) return { error: "You are not logged in" };

    const restaurant = await prisma.restaurant.create({
      data: {
        ...restaurantData
      },
    });

    // Creating membership
    const membership = await prisma.membership.create({
      data: {
        userId: session?.user?.id as string,
        role: "ADMIN",
        restaurantId: restaurant?.id as string
      }
    });

    if (!restaurant || !membership) return { error: "Something went wrong during restaurant creation" };
    return { success: "Restaurant created successfully" };

  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
}