export class Role {
    role_id: number = 0;
    role_name: string = "";
    dashboards: any[] = [];
}

export const ROLE_SAMPLE = [
    {
        id: 0,
        name: "Admin",
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_id: 1,
                instance_name: "184",
                menu_id: 1,
                menu_name: "Nutanix 全文檢索",
            },
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_id: 1,
                instance_name: "184",
                menu_id: 2,
                menu_name: "Alert 集中檢索",
            },
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_id: 3,
                menu_name: "Audit 集中檢索",
            },
            {
                dashboard_id: 3,
                dashboard_name: "Dashboard D",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_id: 4,
                menu_name: "Event 全文檢索",
            },
            {
                dashboard_id: 4,
                dashboard_name: "Dashboard E",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_id: 5,
                menu_name: "硬體異常集中檢索",
            },
            {
                dashboard_id: 5,
                dashboard_name: "Dashboard F",
                description: "description...",
                instance_id: 3,
                instance_name: "186",
                menu_id: 4,
                menu_name: "Event 全文檢索",
            },
        ]
    },
    {
        id: 1,
        name: "Ops",
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_id: 1,
                instance_name: "184",
                menu_id: 1,
                menu_name: "Nutanix 全文檢索",
            },
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_id: 2,
                menu_name: "Alert 集中檢索",
            },
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_id: 3,
                instance_name: "186",
                menu_id: 3,
                menu_name: "Audit 集中檢索",
            },
        ]
    },
    {
        id: 2,
        name: "Role X",
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_id: 1,
                instance_name: "184",
                menu_name: "Nutanix 全文檢索",
            },
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_id: 2,
                menu_name: "Alert 集中檢索",
            },
        ]
    },
    {
        id: 3,
        name: "Role Y",
        dashboards: [
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_id: 3,
                instance_name: "186",
                menu_id: 3,
                menu_name: "Audit 集中檢索",
            },
            {
                dashboard_id: 3,
                dashboard_name: "Dashboard D",
                description: "description...",
                instance_id: 3,
                instance_name: "186",
                menu_id: 4,
                menu_name: "Event 全文檢索",
            },
        ]
    },
];

export const ALL_ROLES = [
    { id: 0, name: "Admin" }, 
    { id: 1, name: "Ops" }, 
    { id: 2, name: "Role X" }, 
    { id: 3, name: "Role Y" }
];
