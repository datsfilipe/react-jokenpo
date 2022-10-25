interface PlayButtonProps {
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayButton = (props: PlayButtonProps) => {
  return <button onClick={() => props.setPlaying(true)}>Play</button>;
};
