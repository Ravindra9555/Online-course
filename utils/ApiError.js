class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        // ✅ Make sure `Error` is not being overwritten and exists
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    }
  }
  export { ApiError };