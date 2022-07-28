const Logo = require("../../assets/webmaster-bg-full.png");

export function ShowAnswerPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "92vh",
      }}
    >
      <div>
        <img
          src={Logo}
          alt="Web Master"
          style={{ height: "160px", width: "160px", margin: "0 50px" }}
        />
        <p style={{ textAlign: "center" }}>Sua resposta já foi cadastrada!</p>
      </div>
    </div>
  );
}
