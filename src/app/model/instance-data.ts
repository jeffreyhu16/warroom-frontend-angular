export class Instance {
    instance_id: number = -1;
    ip: string = "";
    name: string = "";
    type: string = "";
    user: string = "";
    pass: string = "";
    auth: number = 0;
}

export const INSTANCE_SAMPLE = [
    {
        instance_id: 1,
        ip: "http://51.15.89.184:5601",
        name: "184",
        type: "basic",
        user: "elastic",
        pass: "ECs0Q4I5YsJk9zrp2bMr",
        auth: 1
    }
];

export const ALL_INSTANCES = [
    { 
        instance_id: 1,
        name: "184",
        dashboards: [
            {
                dashboard_id: 0,
                dashboard_name: "Dashboard A",
                description: "description...",
                instance_id: 1,
                instance_name: "184",
                menu_name: "Nutanix 全文檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 1,
                dashboard_name: "Dashboard B",
                description: "description...",
                instance_id: 1,
                instance_name: "184",
                menu_name: "Alert 集中檢索",
                space_name: "Default Space",
            },
        ] 
    }, 
    { 
        instance_id: 2,
        name: "185",
        dashboards: [
            {
                dashboard_id: 2,
                dashboard_name: "Dashboard C",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_name: "Audit 集中檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 3,
                dashboard_name: "Dashboard D",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_name: "Event 全文檢索",
                space_name: "Default Space",
            },
            {
                dashboard_id: 4,
                dashboard_name: "Dashboard E",
                description: "description...",
                instance_id: 2,
                instance_name: "185",
                menu_name: "硬體異常集中檢索",
                space_name: "Default Space",
            },
        ] 
    }, 
    { 
        instance_id: 3,
        name: "186",
        dashboards: [
            {
                dashboard_id: 5,
                dashboard_name: "Dashboard F",
                description: "description...",
                instance_id: 3,
                instance_name: "186",
                menu_name: "Event 全文檢索",
                space_name: "Default Space",
            },
        ] 
    }
];