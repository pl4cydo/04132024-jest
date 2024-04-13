const axios = require("axios")

test("testando home", async () => {
    const response = await axios.get("http://localhost:8001/")
    expect(response.data).toEqual({ text: "opa" })
})


test("Testando movies", async () => {
    const response = await axios.get("http://localhost:8001/movies/list");
    const data = response.data
    data.forEach(movie => {
        expect(movie).toEqual(expect.objectContaining({
          title: expect.any(String),
          year: expect.any(Number),
        }));
     });
})