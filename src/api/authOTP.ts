import { WorkflowClient } from "@temporalio/client";
import { defineSignal } from "@temporalio/workflow";

async function run() {
  const workflowId = "12345678910";

  const client = new WorkflowClient();
  const workflow = client.getHandle(workflowId);
  const sendOTP = defineSignal<string[]>("OTP");
  await workflow.signal(sendOTP, "123456");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
