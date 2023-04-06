
const handleChad = (req, res) => {
    const {msg} = req.body;
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String("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")
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": msg}],
          'temperature': 1,
          'max_tokens': 200,
        })
      };
      fetch('https://api.openai.com/v1/chat/completions', requestOptions)
          .then(response => response.json())
          .then(data => {
            res.json(data.choices[0].message.content)
        }).catch(err => {
          res.json("Ran out of tokens for today! Try tomorrow! \n"+err);
        });
      }





module.exports = {
  handleChad
};