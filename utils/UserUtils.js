
console.log("UserUtils.js loaded."); 
export function  checkUserRole(session) {
  console.log("Checking user role with session:", session);

  if (
      !session ||
      !session.user ||
      !session.user.organizationMemberships ||
      session.user.organizationMemberships.length === 0
  ) {
      console.log("User or organization memberships not found.");
      return null;
  }

  const organizationMemberships = session.user.organizationMemberships;

  // Loop through all organization memberships
  for (const membership of organizationMemberships) {
      if (membership.role) {
          console.log("Found role:", membership.role);
          return membership.role.toLowerCase();
      }
  }

  console.log("No role found in memberships.");
  return null;
}



// utils/UserUtils.js

// export const checkUserRole = (session) => {
//   // Ensure session and roles are available
//   if (!session || !session.publicUserData || !session.publicUserData.roles) {
//     return 'guest'; // Assuming guest role for no session or roles
//   }

//   // Check if the user has the 'org:admin' role
//   if (session.publicUserData.roles.includes('org:admin')) {
//     return 'admin';
//   }

//   // Add more role checks as needed

//   // Default to 'user' role if no specific role matches
//   return 'user';
// };
