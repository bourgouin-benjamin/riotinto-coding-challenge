import app from "../src/index";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
});
