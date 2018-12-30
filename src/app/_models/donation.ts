export class Donation {
    key: string;
    uid: string;
    name: string;
    email: string;
    amount: number;
    description: string;
    is_money: boolean;
    collected: boolean;
    collected_date: string;
    collected_estimated_date: string;
    approved: boolean;
    date: string;
    address: Address;

    constructor() {
        this.uid = '';
        this.name = '';
        this.email = '';
        this.amount = 0;
        this.description = '';
        this.is_money = false;
        this.collected = false;
        this.collected_date = '';
        this.collected_estimated_date = '';
        this.approved = false;
        this.date = '';

        this.address = new Address();
        this.address.street = '';
        this.address.outdoor_number = '';
        this.address.interior_number = '';
        this.address.colony = '';
        this.address.city = '';
    }
}

export class Address {
    street: string;
    outdoor_number: string;
    interior_number: string;
    colony: string;
    city: string;
}
