// place files you want to import through the `$lib` alias in this folder.
export type Customer = {
    customerId: string;
    name: string;
    age: number;
    emailAddress: string;
    phoneNumber: string;
    username: string;
};

export let testCustomer: Customer = {
    customerId: "1",
    name: "John Doe",
    age: 1,
    emailAddress: "johnDoe@gmail.com",
    phoneNumber: "1234567890",
    username: "test",
};
