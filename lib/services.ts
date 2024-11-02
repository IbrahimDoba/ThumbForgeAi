export function generateUsername(email: string) {
    const username = email
      .split('@')[0] // Take everything before the '@'
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]/g, ''); // Remove all non-alphanumeric characters
  
    return username;
  }
  
//   export function generateDisplayName() {
//     const randomString = nanoid(4);
//     return `User${randomString}`;
//   }
  