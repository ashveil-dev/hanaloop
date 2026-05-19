type ApiErrorParams = {
  status?: number,
  message?: string;
};

export class ApiError extends Error {
  status: number;

  constructor({ status = 500, message = "Internal Server Error"}: ApiErrorParams) {
    super(message);

    this.status = status;
  }
}