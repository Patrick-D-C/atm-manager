import receiveInHome from "../assets/receba-em-casa.svg";
export function Hero() {
    return (
        <aside>
        <h2>Receba seu dinheiro sem sair de casa!</h2>
        <img
          src={receiveInHome}
          alt="Receba seu dinheiro sem sair de casa"
          height={300}
        />
      </aside>
    )
}