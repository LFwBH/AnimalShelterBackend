export type CodeDescription<
  TCode extends number = number,
  TStatus extends number = TCode
> = {
  code: TCode;
  status: TStatus;
  message: string;
};

export class Code {
  public static SUCCESS: CodeDescription<200> = {
    code: 200,
    status: 200,
    message: "Success",
  };

  public static BAD_REQUEST_ERROR: CodeDescription<400> = {
    code: 400,
    status: 400,
    message: "Bad request",
  };

  public static UNAUTHORIZED_ERROR: CodeDescription<401> = {
    code: 401,
    status: 401,
    message: "Unauthorized error",
  };

  public static WRONG_CREDENTIALS_ERROR: CodeDescription<402> = {
    code: 402,
    status: 402,
    message: "Wrong Credentials",
  };

  public static ACCESS_DENIED_ERROR: CodeDescription<403> = {
    code: 403,
    status: 403,
    message: "Access denied",
  };

  public static INTERNAL_ERROR: CodeDescription<500> = {
    code: 500,
    status: 500,
    message: "Internal error",
  };

  public static ENTITY_NOT_FOUND_ERROR: CodeDescription<1000, 404> = {
    code: 1000,
    status: 404,
    message: "Entity not found",
  };

  public static ENTITY_VALIDATION_ERROR: CodeDescription<1001, 400> = {
    code: 1001,
    status: 400,
    message: "Entity validation error",
  };

  public static USE_CASE_PORT_VALIDATION_ERROR: CodeDescription<1002, 400> = {
    code: 1002,
    status: 400,
    message: "Use-case port validation error",
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: CodeDescription<1003, 409> = {
    code: 1003,
    status: 409,
    message: "Entity already exists",
  };
}
