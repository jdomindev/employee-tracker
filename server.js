// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
