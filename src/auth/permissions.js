export const Roles = {
    ADMIN: "admin",
    STAFF: "staff",
    VIEWER: "viewer",
  };
  
  export function can(role, action) {
    const perms = {
      admin: ["create", "update", "delete"],
      staff: ["create", "update"],
      viewer: [],
    };
    return perms[role]?.includes(action) ?? false;
  }
  
  export class PermissionError extends Error {
    constructor(message = "Permission denied") {
      super(message);
      this.name = "PermissionError";
    }
  }
  