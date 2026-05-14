import { ApiError } from "@server/errors/ApiError";

export class NotFoundError extends ApiError {
  constructor({ message = "Not Found" }) {
    super({
      status: 404,
      message
    });
  }
}