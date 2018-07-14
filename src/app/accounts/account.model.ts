export class Account {
    constructor(
        public description: string,
        public amount: string,
        public type: AccountType,
        public uid: string = null
    ) {}

    static create({ uid, ...account}: Account) {
        uid = uid || undefined;
        return new Account(account.description, account.amount, account.type, uid);
    }
}

export type AccountType = 'incoming' | 'outcoming';
