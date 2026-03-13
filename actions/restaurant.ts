'use server';
import { prisma } from "@/lib/prisma";
import z from "zod";
import { restaurantSchema } from "@/lib/zod";
import { getAuthSession } from "@/lib/utils";



export const createRestaurant = async (data: z.infer<typeof restaurantSchema>) => {
  try {
    const restaurantData = restaurantSchema.parse(data);

    const session = await getAuthSession();

    if (!session?.user?.id) return { error: "You are not logged in" };

    const restaurant = await prisma.restaurant.create({
      data: {
        ...restaurantData,
        memberships: {
          create: {
            userId: session.user.id,
            role: "ADMIN"
          }
        }
      },
    });

    if (!restaurant) return { error: "Something went wrong during restaurant creation" };
    return { success: "Restaurant created successfully" };

  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
}