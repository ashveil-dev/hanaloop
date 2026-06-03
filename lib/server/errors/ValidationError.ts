import { ApiError } from "@/lib/server/errors/ApiError";

type ValidationErrorParams = {
    message?: string;
    errors: unknown
};

export class ValidationError extends ApiError {
    errors: unknown

    constructor({
        message = "Invalid Input",
        errors,
    }: ValidationErrorParams) {
        super({ status: 400, message });

        this.errors = errors;
    }
}