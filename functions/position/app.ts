import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as yup from "yup";

import { validateInput } from "./position.validator";
import { getResult } from "./position.service";
import { CustomError } from "functions/custom-error";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { start, instructions } = validateInput(event.body);
    const newPosition = getResult(start, instructions);

    return {
      statusCode: 200,
      body: newPosition,
    };
  } catch (err) {
    if (err instanceof CustomError) {
      const { statusCode, message } = err;
      return {
        statusCode,
        body: message,
      };
    }

    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
};
