import app from "../src/index";

const PORT: number = 4444

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
});
