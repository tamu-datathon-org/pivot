export enum InfoBuilderDataFields {
  GATEKEEPER_AUTH_ID = "gatekeeperData.authId",
  GATEKEEPER_EMAIL = "gatekeeperData.email",
  GATEKEEPER_FIRST_NAME = "gatekeeperData.firstName",
  GATEKEEPER_LAST_NAME = "gatekeeperData.lastName",
  GATEKEEPER_IS_ADMIN = "gatekeeperData.isAdmin",
}

export interface InfoBuilderData {
  gatekeeperData?: {
    authId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
  }
}