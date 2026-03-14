import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("69b4aef600060e6a944e");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
