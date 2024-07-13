
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

  for (const membership of organizationMemberships) {
      if (membership.role) {
          console.log("Found role:", membership.role);
          return membership.role.toLowerCase();
      }
  }

  console.log("No role found in memberships.");
  return null;
}

