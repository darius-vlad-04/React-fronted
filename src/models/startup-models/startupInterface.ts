export interface StartupInterface {
    id: number;
    founder_id: number;
    name: string;
    description: string;
    funding_goal: number;
    created_at: Date;
    current_funding: number;
    tags: string[];
}