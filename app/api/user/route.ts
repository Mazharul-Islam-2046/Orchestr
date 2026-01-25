import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextRequest } from "next/server";


interface UserRequestBody {
    name: string;
    email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    const { name, email } = body as UserRequestBody;

    if (!name || !email) {
      return new Response("Name and email are required", { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error("Error in POST /api/users:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid request", 
          message: "Invalid JSON in request body" 
        }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle Prisma unique constraint violations (duplicate email)
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return new Response(
        JSON.stringify({ 
          error: "Conflict", 
          message: "A user with this email already exists" 
        }), 
        { 
          status: 409,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle Prisma validation errors
    if (error instanceof PrismaClientValidationError) {
      return new Response(
        JSON.stringify({ 
          error: "Validation error", 
          message: "Invalid data provided" 
        }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle other Prisma known errors
    if (error instanceof PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({ 
          error: "Database error", 
          message: "Failed to create user" 
        }), 
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle other Prisma errors
    if (error instanceof PrismaClientUnknownRequestError) {
      return new Response(
        JSON.stringify({ 
          error: "Database error", 
          message: "Database operation failed" 
        }), 
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Generic error fallback
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        message: "An unexpected error occurred" 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}