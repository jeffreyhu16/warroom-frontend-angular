export class User {
    user_id: number = 0;
    name: string = "";
    roles: any[] = [];
}

export const USER_SAMPLE = [
    {
        user_id: 0,
        name: "User A",
        roles: [{ role_id: 0, name: "Admin" }]
    },
    {
        user_id: 1,
        name: "User B",
        roles: [{ role_id: 1, name: "Ops" }]
    },
    {
        user_id: 2,
        name: "User C",
        roles: [{ role_id: 2, name: "Role X" }, { role_id: 3, name: "Role Y" }]
    },
    {
        user_id: 3,
        name: "User D",
        roles: [{ role_id: 3, name: "Role Y" }]
    },
];

