import cat1 from "../assets/cat1.jpg";
import cat2 from "../assets/cat2.jpg";
import cat3 from "../assets/cat3.jpg";
import dog1 from "../assets/dog1.jpg";
import dog2 from "../assets/dog2.jpg";
import dog3 from "../assets/dog3.jpg";

export const addsData = [
  {
    id: 0,
    name: "silver",
    pictures: [{ url: cat1 }, { url: cat2 }, { url: cat3 }],
    type: "cat",
    race: "Ragdoll",
    vaccinated: true,
    health: "great",
    age: "5",
    owner: "username",
    location: "alger",
    number: "0541++",
    date: "12/2/2023",
  },
  {
    id: 1,
    name: "max",
    pictures: [{ url: dog1 }, { url: dog2 }, { url: dog3 }],
    type: "dog",
    race: "husky",
    vaccinated: true,
    health: "great",
    age: "8",
    owner: "username",
    location: "tipaza",
    number: "0541++",
    date: "12/2/2023",
  },
];
