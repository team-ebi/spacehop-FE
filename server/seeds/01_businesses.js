exports.seed = function(knex) {
  return knex("businesses").del()
    .then(function () {
      return knex("businesses").insert([
        {
          name: "Spacehop Cafe",
          address_street: "1st Street",
          address_city: "Roppongi",
          address_zip: "777",
          phone: "0123-456-789",
          business_type: "Cafe",
          capacity: 10,
          price: 1000
        },
        {
          name: "Space Xchange",
          address_street: "2nd Street",
          address_city: "Shibuya",
          address_zip: "777",
          phone: "0123-456-789",
          business_type: "Bar",
          capacity: 20,
          price: 20000 
        },
        {
          name: "Flexspace Hamburger",
          address_street: "3rd Street",
          address_city: "Shinjuku",
          address_zip: "777",
          phone: "0123-456-789",
          business_type: "Restaurant",
          capacity: 30,
          price: 30000
        },
        {
          name: "Bar X",
          address_street: "4th Street",
          address_city: "Shibuya",
          address_zip: "777",
          phone: "0123-456-789",
          business_type: "Bar",
          capacity: 40,
          price: 40000
        },
        {
          name: "Cafe X",
          address_street: "5th Street",
          address_city: "Shinjuku",
          address_zip: "777",
          phone: "0123-456-789",
          business_type: "Cafe",
          capacity: 40,
          price: 40000
        }
      ]);
    });
};
