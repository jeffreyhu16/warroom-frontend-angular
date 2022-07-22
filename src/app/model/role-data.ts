export class Role {
    role_id: number = 0;
    name: string = "";
    dashboards: any[] = [];
}

export const ROLE_SAMPLE = [
    {
        role_id: 0,
        name: "Admin",
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_name: "184",
                menu_name: "Nutanix 全文檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_name: "185",
                menu_name: "Alert 集中檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_name: "186",
                menu_name: "Audit 集中檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 3,
                dashboard_name: "Dashboard D",
                description: "description...",
                instance_name: "186",
                menu_name: "Event 全文檢索",
                space_name: "Default Space",
            },
        ]
    },
    {
        role_id: 1,
        name: "Ops",
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_name: "184",
                menu_name: "Nutanix 全文檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_name: "185",
                menu_name: "Alert 集中檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_name: "186",
                menu_name: "Audit 集中檢索",
                space_name: "Default Space",
            },
        ]
    },
    {
        role_id: 2,
        name: "Role X",
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_name: "184",
                menu_name: "Nutanix 全文檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_name: "185",
                menu_name: "Alert 集中檢索",
                space_name: "Default Space",
            },
        ]
    },
    {
        role_id: 3,
        name: "Role Y",
        dashboards: [
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_name: "186",
                menu_name: "Audit 集中檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 3,
                dashboard_name: "Dashboard D",
                description: "description...",
                instance_name: "186",
                menu_name: "Event 全文檢索",
                space_name: "Default Space",
            },
        ]
    },
];

export const ALL_ROLES = [
    { role_id: 0, name: "Admin" }, 
    { role_id: 1, name: "Ops" }, 
    { role_id: 2, name: "Role X" }, 
    { role_id: 3, name: "Role Y" }
];
