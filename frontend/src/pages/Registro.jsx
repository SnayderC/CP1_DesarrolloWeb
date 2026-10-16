import FormularioHabito from "../components/FormularioHabito";

export default function Registro() {
  return (
    <section className="pagina-registro">
      <h1>Registrar nuevo hábito</h1>
      <p className="subtitulo">Completa los datos del hábito que realizaste. Todos los campos son obligatorios.</p>
      <FormularioHabito />
    </section>
  );
}
