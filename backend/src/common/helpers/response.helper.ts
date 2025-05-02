export function success<T>(message: string, data?: T, statusCode = 200) {
  return {
    statusCode,
    message,
    ...(data !== undefined ? { data } : {}),
  };
}
