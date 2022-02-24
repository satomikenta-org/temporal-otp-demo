import { WorkflowClient } from "@temporalio/client";
import { defineQuery } from "@temporalio/workflow";

async function run() {
  const workflowId = "12345678910";

  const client = new WorkflowClient();
  const workflow = client.getHandle(workflowId);
  const OTPStateQuery = defineQuery<string>("state");
  const queryResult = await workflow.query(OTPStateQuery);
  console.log(" ========== Query Result OTP State =========== ", queryResult);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
