const extractErrorMessage = (err: any) => {
  const errorMessage = err.graphQLErrors[0]?.extensions?.originalError?.message;
  if (!errorMessage) return;
  
  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  }
  return formatErrorMessage(errorMessage);
}
const formatErrorMessage = (errMessage: string): string => {
  return errMessage.charAt(0).toUpperCase() + errMessage.slice(1);
}
export { extractErrorMessage };