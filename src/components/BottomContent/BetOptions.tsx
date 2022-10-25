interface BetOptionsProps {
  guess: GuessTypes;
  setGuess: React.Dispatch<React.SetStateAction<GuessTypes>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BetOptions = (props: BetOptionsProps) => {
  return (
    <select
      value={props.guess}
      onChange={e => {
        const newGuess = e.target.value as GuessTypes
        props.setGuess(newGuess);
        props.setPlaying(false);
      }}
    >
      <option value='scissors'>scissors</option>
      <option value='rocks'>rocks</option>
      <option value='papers'>papers</option>
    </select>
  );
};
