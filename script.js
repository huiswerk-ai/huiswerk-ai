async function verstuurVraag() {
  const vraag = document.getElementById("vraag").value;
  const antwoordVak = document.getElementById("antwoord");
  antwoordVak.innerText = "Even nadenken...";

  try {
    const response = await fetch("https://huiswerk-ai.onrender.com./api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vraag })
    });

    const data = await response.json();
    antwoordVak.innerText = data.antwoord;
  } catch (error) {
    antwoordVak.innerText = "Er ging iets mis met de AI-server.";
    console.error(error);
  }
}
