import { ApiError } from "@server/errors/ApiError";

export class ValidationError extends ApiError {
    errors: string;

    constructor(message = "Invalid Input", errors: string) {
        super(400, message);

        this.errors = errors;
    }
}