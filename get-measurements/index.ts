import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  context.log("HTTP trigger function processed a request.");

  context.res = {
    body: process.env.DATABASE_URL.slice(0, 10),
  };
};

export default httpTrigger;
