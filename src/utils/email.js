import faker from "faker";

export const emails = [
  {
    id: "1",
    name: "Taylor Swift",
    title: "You Belong With Me...",
    body: "You are so cool! Can we be besties?",
    email: "tswift@gmail.com",
  },
];

export function generateEmail({ id, name, title, body, email } = {}) {
  return {
    id: id || faker.random.uuid(),
    name: name || `${faker.name.firstName()} ${faker.name.lastName()}`,
    title: title || faker.lorem.sentence(),
    body: body || faker.lorem.paragraph(),
    email: email || faker.internet.email(),
  };
}

export function fetchEmails(num) {
  let emails = [];

  for (let index = 0; index < num; index++) {
    let email = generateEmail();
    emails.push(email);
  }

  return emails;
}
