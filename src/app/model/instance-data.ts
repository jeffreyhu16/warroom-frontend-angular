export class Instance {
    instance_id: number = 0;
    ip: string = "";
    name: string = "";
    type: string = "";
    user: string = "";
    pass: string = "";
    auth: number = 0;
}

export const INSTANCE_SAMPLE = [
    {
        instance_id: 0,
        ip: "http://51.15.89.184:5601",
        name: "184",
        type: "basic",
        user: "elastic",
        pass: "ECs0Q4I5YsJk9zrp2bMr",
        auth: 1
    }
];

export const ALL_INSTANCES = [
    { instance_id: 0, name: "184" }, 
    { instance_id: 1, name: "185" }, 
    { instance_id: 2, name: "186" }
]