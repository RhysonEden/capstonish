const { Client } = require("pg");

const client = new Client("postgres://localhost:5432/capstone");

async function createUser({ username, password, seller, shoppingcart }) {
  try {
    const result = await client.query(
      `
      INSERT INTO users(username, password, seller, shoppingcart)
      VALUES ($1, $2, $3, $4);
    `,
      [username, password, seller, shoppingcart]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

async function createProduct({ itemname, description, price, category }) {
  try {
    const result = await client.query(
      `
    INSERT INTO products(itemname, description, price, category)
    VALUES ($1, $2, $3, $4);
    `,
      [itemname, description, price, category]
    );
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

async function createReview({ username, review }) {
  try {
    const result = await client.query(
      `
    INSERT INTO reviews(username, review )
    VALUES ($1, $2);
    `,
      [username, review]
    );
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  const { rows } = await client.query(
    `
    SELECT * FROM products
    `
  );
  return rows;
}

async function getProductsById(id) {
  try {
    const { rows } = await client.query(
      `
    SELECT * 
    FROM products
    WHERE id=$1
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT username, seller, shoppingcart
    FROM users;
  `
  );

  return rows;
}

async function getUsersByID(id) {
  try {
    const { rows } = await client.query(
      `
    SELECT username, seller, shoppingcart
    FROM users
    WHERE id=$1
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllReviews() {
  const { rows } = await client.query(
    `
    SELECT * FROM reviews
    `
  );
  return rows;
}

async function getReviewsByID(id) {
  try {
    const { rows } = await client.query(
      `
    SELECT *
    FROM reviews
    WHERE id=$1
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllUsers,
  createUser,
  createProduct,
  getAllProducts,
  getAllReviews,
  createReview,
  getProductsById,
  getUsersByID,
  getReviewsByID,
};
