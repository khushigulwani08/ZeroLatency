const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let randomNumber = Math.floor(Math.random() * 100) + 1;

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Number Guessing Game</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: white;
          text-align: center;
          padding-top: 100px;
        }
        .card {
          background: rgba(255,255,255,0.1);
          padding: 40px;
          border-radius: 15px;
          width: 350px;
          margin: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        input {
          padding: 10px;
          font-size: 16px;
          margin-top: 10px;
        }
        button {
          padding: 10px 20px;
          margin-top: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🎮 Guess the Number</h1>
        <p>Guess a number between 1 and 100</p>
        <form action="/guess" method="POST">
          <input type="number" name="guess" required />
          <br/>
          <button type="submit">Guess</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.post("/guess", (req, res) => {
  const guess = parseInt(req.body.guess);
  let message = "";

  if (guess > randomNumber) {
    message = "📉 Lower!";
  } else if (guess < randomNumber) {
    message = "📈 Higher!";
  } else {
    message = "🎉 Correct! Generating new number...";
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }

  res.send(`
    <html>
    <body style="font-family: Arial; text-align:center; padding-top:100px;">
      <h1>${message}</h1>
      <a href="/">Try Again</a>
    </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Server running on port 3000"));