const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const filePath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  // Повертає масив контактів.
  const contacts = await fs.readFile(filePath, { encoding: "utf-8" });

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();

  const contactById = contacts.find((book) => book.id === contactId);

  return contactById ?? null;
}

async function removeContact(contactId) {
  //Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contacts[index];
  contacts.splice(index, 1);

  await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();

  const newContact = { name, email, phone, id: crypto.randomUUID() };

  contacts.push(newContact);

  await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
