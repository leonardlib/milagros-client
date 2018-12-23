export class Donation {
    key: string;
    uid: string;
    name: string;
    email: string;
    amount: number;
    description: string;
    is_money: boolean;
    date: string;
    address: Address;

    constructor() {
        this.address = new Address();
    }
}

export class Address {
    street: string;
    outdoor_number: string;
    interior_number: string;
    colony: string;
    city: string;
}
