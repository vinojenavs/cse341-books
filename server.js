import { app } from "./app.js";
import { connectToDb } from "./src/db/connect.js";

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error('Port is undefined');
};

const startServer = async () => {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(`Port is listening at 127.0.0.1:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to database:', error.message);
        process.exit(1);
    }
};

await startServer();