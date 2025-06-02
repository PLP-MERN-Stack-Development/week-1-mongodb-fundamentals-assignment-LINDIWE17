plp_bookstore

 db.insertMany([
    {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]);


db.books.find({ genre: "Fiction" })

db.books.find({ genre: "Gothic Fiction" })

db.books.find({ genre: "Adventure" })

db.books.find({ genre: "Political Satire" })

db.books.find({ genre: "Fantasy" })

db.books.find({ genre: "Romance" })

db.books.find({ genre: "Dystopian" })


db.books.find({ published_year: { $gt: 1951 } })

db.books.find({ author: "George Orwell" })

db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
)

db.books.deleteOne({ title: "The Great Gatsby" })

db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// This query retrieves all books with only the title, author, and price fields, excluding the _id field.
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// this query retrieves all books sorted by price in ascending order. (Lowest to Highest)
db.books.find().sort({ price: 1 })

// this query retrieves all books sorted by price in descending order. (Highest to Lowest)
db.books.find().sort({ price: -1 })

// This query retrieves the first 5 books in the collection.
db.books.find().limit(5)

// This query retrives the average price of books in each genre.
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// This query retrives author with the most books in the collection.
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// This query retrieves the total number of books published in each decade.
db.books.aggregate([
  { $addFields: { decade: { $floor: { $divide: ["$published_year", 10] } } } },
  { $group: { _id: "$decade", bookCount: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

db.books.createIndex({ title: 1 })

db.books.find({ author: "J.D. Salinger", published_year: { $gt: 1950 } })

db.books.createIndex({ author: 1 })
db.books.find({ author: "J.R.R. Tolkien" }).explain("executionStats")