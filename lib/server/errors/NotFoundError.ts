import { ApiError } from "@server/errors/ApiError";

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}