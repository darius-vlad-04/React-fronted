export interface UserInterface
{
    id: number;
    name: string;
    email: string;
    password: string;
    profile_bio?: string;
    profile_pic_path?: string | null;
    created_at: Date;
    role_id: number;

}