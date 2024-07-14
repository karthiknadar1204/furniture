
console.log("UserUtils.js loaded."); 
export function  checkUserRole(session) {

  if (
      !session ||
      !session.user ||
      !session.user.organizationMemberships ||
      session.user.organizationMemberships.length === 0
  ) {
      return null;
  }

  const organizationMemberships = session.user.organizationMemberships;

  for (const membership of organizationMemberships) {
      if (membership.role) {
          return membership.role.toLowerCase();
      }
  }

  console.log("No role found in memberships.");
  return null;
}

