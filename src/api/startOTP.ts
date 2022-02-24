import { Connection, WorkflowClient } from "@temporalio/client";

async function run() {
  const connection = new Connection({});

  const client = new WorkflowClient(connection.service, {});

  const handle = await client.start("authOneTimePassword", {
    args: ["12345"],
    taskQueue: "otp",
    workflowId: "12345678910",
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
