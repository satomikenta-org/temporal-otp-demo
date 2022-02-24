import {
  proxyActivities,
  condition,
  setHandler,
  defineSignal,
  defineQuery,
} from "@temporalio/workflow";

import type * as activities from "./activities";

const { authOTP } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

type OTPState = "pending" | "done" | "canceled";

export async function authOneTimePassword(code: string): Promise<string> {
  let state: OTPState = "pending";
  let codeSentFromUser: string = "";

  setHandler(defineSignal<string[]>("OTP"), (payload) => {
    codeSentFromUser = payload;
    state = "done";
  });

  setHandler(defineQuery<OTPState>("state"), () => state);

  const isExpired = !(await condition(() => state === "done", "1 minute"));

  if (isExpired) {
    state = "canceled";
    return "OTP Expired...";
  }

  const isMatched = await authOTP(code, codeSentFromUser);
  return isMatched ? "You are Authenticated!!" : "OTP is not correct.";
}
