const express = require('express');
const { PrismaClient } =  require('@prisma/client')
const cors = require('cors')


const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors())
//Books....

app.get('/book_data', async (req, res) => {
    console.log(req)
    const books = await prisma.book_data.findMany();
    console.log(books);
    res.json(books)
});


app.post('/createdata', async (req, res) => {
    const book_data = await prisma.book_data.create({
        data:{
            title:req.body.title,
            stationary:req.body.stationary,
            price:req.body.price,
            image:req.body.image,
        }
    });

    console.log("Books",book_data);
    res.status(200).json(book_data)
});

// app.put("/books/:id", async (req, res) => {
//     try {
//         const updatedUser = await prisma.books.update({
//             where: {
//                 books_id: parseInt(req.params.id),
//             },
//             data: {
//                 books_status:req.body.books_status,
//                 vendor_code:req.body.vendor_code,
//                 books_price:req.body.books_price,
//                 library_name:req.body.library_name
//             },
//         });
//         res.json(updatedUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred while updating the user." });
//     }
// }
// );

// app.delete("/books/:id", async (req, res) => {
//     try {
//         const deletedUser = await prisma.books.delete({
//             where: {
//                 books_id: parseInt(req.params.id),
//             },
//         });
//         res.json(deletedUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred while deleting the user." });
//     }
// }
// );

// //Publisher......
// app.get('/Publisher', async (req, res) => {
//     console.log(req)
//     const Publisher = await prisma.publisher.findMany();
//     console.log(Publisher);
//     res.json(Publisher)
// });


// app.post('/createPublisher', async (req, res) => {
//     const Publisher = await prisma.publisher.create({
//         data:{
//             publisher_code:req.body.publisher_code,
//             publisher_name:req.body.publisher_name,
//             publisher_country:req.body.publisher_country,
//             books_id:req.body.books_id
//         }
//     });

//     console.log(Publisher);
//     res.json(Publisher)
// });

// app.put("/Publisher/:id", async (req, res) => {
//     try {
//         const updatedUser = await prisma.publisher.update({
//             where: {
//                 id: parseInt(req.params.id),
//             },
//             data: {
//                 publisher_code:req.body.publisher_code,
//                 publisher_name:req.body.publisher_name,
//                 publisher_country:req.body.publisher_country,
//                 books_id:req.body.books_id
//             },
//         });
//         res.json(updatedUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred while updating the user." });
//     }
// }
// );

// app.delete("/Publisher/:id", async (req, res) => {
//     try {
//         const deletedUser = await prisma.publisher.delete({
//             where: {
//                 id: parseInt(req.params.id),
//             },
//         });
//         res.json(deletedUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred while deleting the user." });
//     }
// }
// );


app.listen(3500, () => {
    console.log("server started at port 3500");
});
