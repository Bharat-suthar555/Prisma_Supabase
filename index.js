const express = require('express');
const { PrismaClient } =  require('@prisma/client')

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/books', async (req, res) => {
    console.log(req)
    const books = await prisma.books.findMany();
    console.log(books);
    res.json(books)
});


app.post('/books', async (req, res) => {
    const books = await prisma.books.create({
        data:{
            books_status:req.body.books_status,
            vendor_code:req.body.vendor_code,
            books_price:req.body.books_price,
            library_name:req.body.library_name
        }
    });

    console.log(books);
    res.json(books)
});

app.put("/books/:id", async (req, res) => {
    try {
        const updatedUser = await prisma.books.update({
            where: {
                books_id: parseInt(req.params.id),
            },
            data: {
                books_status:req.body.books_status,
                vendor_code:req.body.vendor_code,
                books_price:req.body.books_price,
                library_name:req.body.library_name
            },
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the user." });
    }
}
);

app.delete("/books/:id", async (req, res) => {
    try {
        const deletedUser = await prisma.books.delete({
            where: {
                books_id: parseInt(req.params.id),
            },
        });
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the user." });
    }
}
);


// app.post("/post", async (req, res) => {
//     const user = await prisma.books.create({
//         data: {
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//             profile_picture: req.body.profile_picture,
//             bio: req.body.bio,
//             location: req.body.location,
//             follower_count: req.body.follower_count,
//             following_count: req.body.following_count,
//         },
//     });
//     console.log(user);
//     res.json(user);
// }
// );



app.listen(3000, () => {
    console.log("server started at port 3000");
});
