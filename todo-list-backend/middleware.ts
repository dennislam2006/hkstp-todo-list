import { Request, Response, NextFunction } from "express";

/**
 * Centralized error-handling middleware for Express.
 * Formats and sends error responses to the client while logging details.
 * @param {Error} e - The error object thrown or passed to next().
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object to send to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const errorHandler = (
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error with request context for debugging
  console.error(`[${req.method} ${req.path}] Error: ${e.message}`, e.stack);

  // Handle specific error cases
  if (e.message.includes("not found")) {
    // Resource not found (e.g., todo with given ID doesn’t exist)
    return res.status(404).json({
      error: {
        message: e.message,
        code: "NOT_FOUND",
      },
    });
  }

  if (e.message.includes("Invalid input")) {
    // Validation errors (e.g., missing title or invalid priority)
    return res.status(400).json({
      error: {
        message: e.message,
        code: "BAD_REQUEST",
      },
    });
  }

  // Default to internal server error for unhandled cases
  res.status(500).json({
    error: {
      message: "Internal server error",
      code: "SERVER_ERROR",
    },
  });
};
