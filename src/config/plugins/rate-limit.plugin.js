import rateLimit from 'express-rate-limit';

export const limitRequest = (maxRequest, windowsMinutes, message) => {
  return rateLimit({
    max: maxRequest,
    windowMs: windowsMinutes * 60 * 1000,
    message: message
  })
}