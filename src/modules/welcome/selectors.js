export const isProcessing = (state) => state.welcome.is_processing;
export const isAuthorized = (state) => state.welcome.is_authorized;
export const getAccessToken = (state) => state.welcome.access_token;
export const getExpiration = (state) => state.welcome.expires_in;
export const getAuthError = (state) => state.welcome.error;
