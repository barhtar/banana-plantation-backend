import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { validateInput } from './position.validator';
import { getResult } from './position.service';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { start, instructions } = validateInput(event.body);
  const newPosition = getResult(start, instructions);

  return {
    statusCode: 200,
    body: newPosition,
  };
};
