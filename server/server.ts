import app from "../src/index";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
});
