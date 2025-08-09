export const isTokenExpired = (token) => {
  if (!token) return true; // No token? Treat as expired

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now(); // Expired? true!
  } catch (err) {
    return true; // Broken token? Treat as expired
  }
};

