type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return (
    <div className="container mx-auto px-8 xl:px-20 max-w-7xl">{children}</div>
  );
}

export default Container
