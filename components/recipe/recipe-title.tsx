import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const RecipeTitle = ({ children }: Props) => {
  return (
    <h1 className="flex justify-center mx-auto text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
      {children}
    </h1>
  );
}

export default RecipeTitle
