export class User {
    constructor(
        public name: string,
        public email: string,
        public uid: string
    ) {}

    static create({ name, email, uid }: User) {
        return new User(name, email, uid);
    }
}
