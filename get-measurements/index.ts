import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  context.log("HTTP trigger function processed a request.");
  context.log(process.env.DATABASE_URL);

  context.res = {
    body: "Hello, world!",
  };
};

export default httpTrigger;
