export class Role {
    role: string = "";
    dashboards: any[] = [];
}

export const ROLE_SAMPLE = [
    {
        role: "Admin",
        dashboards: [
            {
                title: "Dashboard A",
                menu_name: "Nutanix 全文檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
            {
                title: "Dashboard B",
                menu_name: "Alert 集中檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
            {
                title: "Dashboard C",
                menu_name: "Audit 集中檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
            {
                title: "Dashboard D",
                menu_name: "Event 全文檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
        ]
    },
    {
        role: "Ops",
        dashboards: [
            {
                title: "Dashboard A",
                menu_name: "Nutanix 全文檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
            {
                title: "Dashboard B",
                menu_name: "Alert 集中檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
            {
                title: "Dashboard C",
                menu_name: "Audit 集中檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
        ]
    },
    {
        role: "Role X",
        dashboards: [
            {
                title: "Dashboard A",
                menu_name: "Nutanix 全文檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
            {
                title: "Dashboard B",
                menu_name: "Alert 集中檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
        ]
    },
    {
        role: "Role Y",
        dashboards: [
            {
                title: "Dashboard C",
                menu_name: "Audit 集中檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
            {
                title: "Dashboard D",
                menu_name: "Event 全文檢索",
                space_name: "Default Space",
                description: "desc...",
                instance_alias: 184,
            },
        ]
    },
];

export const ALL_ROLES = ["Admin", "Ops", "Role X", "Role Y"];
