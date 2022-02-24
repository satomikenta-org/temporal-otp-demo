export async function authOTP(
  code: string,
  codeSentFromUser: string
): Promise<boolean> {
  return code === codeSentFromUser;
}
