export class User {
    user_name: string = "";
    roles: string[] = [];
}

export const USER_SAMPLE = [
    {
        user_name: "User A",
        roles: ["Admin"]
    },
    {
        user_name: "User B",
        roles: ["Ops"]
    },
    {
        user_name: "User C",
        roles: ["Role X", "Role Y"]
    },
    {
        user_name: "User D",
        roles: ["Role Y"]
    },
];

