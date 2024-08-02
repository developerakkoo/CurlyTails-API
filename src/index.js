require("dotenv").config();
const { app } = require("./app");
const { connectDB } = require("./db/db.index");
const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        const server = app.listen(PORT);
        console.log(
            `Server is running at port : ${PORT} in ${process.env.NODE_ENV} mode`,
        );
        const io = require("./socket").init(server);
        io.on("connection", (socket) => {
            console.log("Connected a User");
            socket.on("disconnect", () => {
                console.log("User Disconnected");
            });
        });
    })
    .catch((err) => {
        console.log("MONGODB contention error", err);
    });
