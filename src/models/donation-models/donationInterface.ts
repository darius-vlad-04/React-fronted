export interface DonationInterface {
    id: number,
    startup_id: number,
    amount: number,
    donated_at: Date,
    perk_id?: number
    donor_id: number
}