export interface IApplicationUser {
    username: string;
    defaultUsername?: string;
    defaultCustomerCode?: string;
    defaultInventoryCode?: string;
    defaultAgencyCode?: string;
    defaultOrderDate?: Date;
}

export function createNewApplicationUser(username: string): IApplicationUser {
    return {
        username
    };
}
