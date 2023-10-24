import Link from 'next/link'

const Header = () => {
  return (
    <div className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" className="hover:underline">
        Two rookie cooks
      </Link>
    </div>
  )
}

export default Header
