export default function Mensaje({ tipo = "info", texto, children }) {
  return (
    <div
      className={`mensaje mensaje--${tipo}`}
      role={tipo === "error" ? "alert" : "status"}
    >
      {texto}
      {children}
    </div>
  );
}