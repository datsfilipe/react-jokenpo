declare type GuessTypes = 'scissors' | 'rocks' | 'papers'

declare type Option = {
  value: string;
  x: number;
  y: number;
  velh: number;
  velv: number;
  acelh: number;
  acelv: number;
  mass: number;
  id: string;
}

declare type OptionsState = {
  scissors: Option[];
  rocks: Option[];
  papers: Option[];
  [key: string]: Option[];
}

declare type Game = {
  guess: GuessTypes | null;
  setGuess: React.Dispatch<React.SetStateAction<GuessTypes | null>>;
  options: OptionsState;
  dispatch: React.Dispatch<Action>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  freezeTime: number;
  moveSpeed: number;
}
