export class Menu {
    menu_id: number = 0;
    menu_name: string = "";
    dashboards: any[] = [];
}

export const MENU_SAMPLE = [
    {
        menu_id: 1,
        menu_name: "Nutanix 全文檢索",
        sort: 0,
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_id: 1,
            },
        ]
    },
    {
        menu_id: 2,
        menu_name: "Alert 集中檢索",
        sort: 0,
        dashboards: [
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_id: 1,
            },
        ]
    },
    {
        menu_id: 3,
        menu_name: "Audit 集中檢索",
        sort: 0,
        dashboards: [
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_id: 2,
            },
        ]
    },
    {
        menu_id: 4,
        menu_name: "Event 全文檢索",
        sort: 0,
        dashboards: [
            {
                dashboard_id: 3,
                dashboard_name: "Dashboard D",
                description: "description...",
                instance_id: 2,
            },
            {
                dashboard_id: 5,
                dashboard_name: "Dashboard F",
                description: "description...",
                instance_id: 3,
            },
        ]
    },
    {
        menu_id: 5,
        menu_name: "硬體異常集中檢索",
        sort: 0,
        dashboards: [
            {
                dashboard_id: 4,
                dashboard_name: "Dashboard E",
                description: "description...",
                instance_id: 2,
            },
        ]
    },
];