const Logo = require("../../assets/webmaster-bg-full.png");

export function ShowTask() {
  return (
    <div style={{ width: "100%", minHeight: "92vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={Logo}
          alt="Web Master"
          style={{ height: "160px", width: "160px", margin: "0 50px" }}
        />
        <h1
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          Tarefa 1
        </h1>
        <p style={{ textAlign: "justify", padding: "16px 36px" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div style={{ background: "#fff", height: "40vh" }}></div>
    </div>
  );
}
