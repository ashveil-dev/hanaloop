import { ApiError } from "@server/errors/ApiError";
import { ZodIssue } from "zod/v3";

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