/** Standard fallback when an API response cannot be treated as success. */
export const DEFAULT_API_ERROR_MESSAGE = 'Something went wrong!!! Plz try again later.';

export const OTP_MESSAGES = {
  invalid: 'Please enter valid OTP.',
  required: 'Please enter OTP',
  sixDigits: 'Please enter 6 digit OTP',
  maxAttempts:
    'You have reached maximum limit to verify OTP. Please try again after sometime.',
  sendFailed: 'Failed to send OTP',
} as const;
