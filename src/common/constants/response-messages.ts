export const ResponseMessages = {
  SONG: {
    CREATED: 'The song has been created successfully.',
    FETCHED: 'Songs have been retrieved successfully.',
    FETCHED_ONE: (id: number) =>
      `Details of song #${id} retrieved successfully.`,
    UPDATED: (id: number) => `Song #${id} has been updated successfully.`,
    DELETED: (id: number) => `Song #${id} has been deleted successfully.`,
    NOT_FOUND: (id?: number) =>
      id ? `No song found with ID: ${id}.` : 'No songs found.',
    NO_DATA_PROVIDED: 'No song data was provided.',
    CREATE_FAILED: 'Failed to create the song.',
    UPDATE_FAILED: 'Failed to update the song.',
    DELETE_FAILED: (id: number) => `Failed to delete song #${id}.`,
  },
  ARTIST: {
    CREATED: 'The artist has been created successfully.',
    FETCHED: 'Artists have been retrieved successfully.',
    FETCHED_ONE: (id: number) =>
      `Details of artist #${id} retrieved successfully.`,
    UPDATED: (id: number) => `Artist #${id} has been updated successfully.`,
    DELETED: (id: number) => `Artist #${id} has been deleted successfully.`,
    DELETE_FAILED: (id: number) => `Failed to delete artist #${id}.`,
    EXISTS: 'This user is already an artist.',
    CREATE_FAILED: 'Failed to create the artist.',
    UPDATE_FAILED: 'Failed to update the artist.',
    NOT_FOUND: 'The requested artist was not found.',
    NO_DATA_PROVIDED: 'No artist data was provided.',
  },
  USER: {
    CREATED: 'The user account has been created successfully.',
    FETCHED: 'User data has been retrieved successfully.',
    FETCHED_ONE: (id: number) =>
      `Details of user #${id} retrieved successfully.`,
    UPDATED: (id: number) => `User #${id} has been updated successfully.`,
    DELETED: (id: number) => `User #${id} has been deleted successfully.`,
    NOT_FOUND: 'The requested user was not found.',
    EMAIL_ALREADY_EXISTS: 'This email is already in use.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
  },
  AUTH: {
    LOGIN_SUCCESS: 'Login successful.',
    LOGOUT_SUCCESS: 'Logout successful.',
    TOKEN_INVALID: 'Invalid token provided.',
    TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
    ACCESS_DENIED: 'Access denied. You do not have the required permissions.',
  },
  GENERAL: {
    SUCCESS: 'Operation completed successfully.',
    FAILURE: 'Operation failed. Please try again.',
    INTERNAL_ERROR: 'An internal server error occurred.',
    BAD_REQUEST: 'Invalid request. Please check your input.',
    FORBIDDEN: 'You do not have permission to access this resource.',
    NOT_FOUND: 'The requested resource was not found.',
    UNAUTHORIZED: 'Unauthorized access. Please log in.',
  },
  PLAYLIST: {
    CREATED: 'The playlist has been created successfully.',
    FETCHED: 'Playlists have been retrieved successfully.',
    FETCHED_ONE: (id: number) =>
      `Details of playlist #${id} retrieved successfully.`,
    UPDATED: (id: number) => `Playlist #${id} has been updated successfully.`,
    DELETED: (id: number) => `Playlist #${id} has been deleted successfully.`,
    NOT_FOUND: (id?: number) =>
      id ? `No playlist found with ID: ${id}.` : 'No playlists found.',
    NO_DATA_PROVIDED: 'No playlist data was provided.',
    CREATE_FAILED: 'Failed to create the playlist.',
    UPDATE_FAILED: 'Failed to update the playlist.',
    DELETE_FAILED: (id: number) => `Failed to delete playlist #${id}.`,
  },
};
