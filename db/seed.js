const {
  client,
  getAllUsers,
  createUser,
  createProduct,
  getAllProducts,
  getAllReviews,
  createReview,
} = require("./index");

async function createInitialReviews() {
  try {
    console.log("Starting to create reviews");

    const review1 = await createReview({
      username: "albert",
      review: "It works at least",
    });

    console.log("Finished creating reviews!");
  } catch (error) {
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    const lappytop = await createProduct({
      itemname: "ASUS VivoBook L203MA Laptop",
      description:
        "15.6 Full HD display The 1920 x 1080 resolution boasts impressive color and clarity. Energy-efficient LED backlight.. AMD Radeon RX Vega 10 Integrated graphics chipset with shared video memory provides solid image quality for Internet use, movies, basic photo editing and casual gaming.",
      price: "230.99",
      category: "computer",
    });

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createTables() {
  try {
    await client.query(`
     CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        itemname varchar(255) UNIQUE NOT NULL,
        description text NOT NULL,                                                    
        price varchar(255) NOT NULL,                                                 
        category varchar(255) NOT NULL
      );  
      CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          review text NOT NULL
      );
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          seller varchar(255) NOT NULL,
          shoppingcart varchar(255)
      );
    `);
  } catch (error) {
    throw error;
  }
}
// "username" INTEGER REFERENCES users(id),
//                       "productId" INTEGER REFERENCES products(id),

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
      seller: true,
    });

    console.log(albert);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    console.log;
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialReviews();
    const review = await getAllReviews();
    console.log("reviews", review);
    const products = await getAllProducts();
    console.log("line 104", products);
    const users = await getAllUsers();
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
