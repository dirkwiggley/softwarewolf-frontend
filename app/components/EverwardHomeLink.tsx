import Link from 'next/link';

export default function EverwardHomeLink() {
  return (
    <div className="flex w-full justify-center pt-2">
      <div className={`w-full max-w-4xl text-center`}>

        <Link href="/home/campaigns/everward" className="inline-flex items-center text-sm font-semibold transition-colors">
          ← Back to Everward Home
        </Link>
      </div>
    </div>
  )
} 