import Link from 'next/link';

export default function PiratesHomeLink() {
  return (
    <div className="flex w-full justify-center pt-2">
      <div className={`w-full max-w-4xl text-center`}>

        <Link href="/home/campaigns/pirates" className="inline-flex items-center text-sm font-semibold transition-colors">
          ← Back to Pirates Home
        </Link>
      </div>
    </div>
  )
} 