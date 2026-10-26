import { app } from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error ('Port is undefined');
};

app.listen(PORT, () => {
    console.log(`Port is listening at 127.0.0.1:${PORT}`);
});