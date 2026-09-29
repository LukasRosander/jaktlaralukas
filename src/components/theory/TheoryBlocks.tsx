import { Info, ListChecks } from 'lucide-react'

import type { TheoryBlock } from '@/types'

/** Renders one structured theory block. New block kinds are added in `types`. */
function Block({ block }: { block: TheoryBlock }) {
  switch (block.kind) {
    case 'heading':
      return (
        <h2 className="font-display mt-10 mb-3 text-2xl leading-tight sm:text-[1.75rem]">
          {block.text}
        </h2>
      )

    case 'paragraph':
      return <p className="text-ink-700 mb-4 text-[1.0625rem] leading-relaxed">{block.text}</p>

    case 'list':
      return (
        <ul className="mb-5 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="text-ink-700 flex gap-3 text-[1.0625rem] leading-relaxed">
              <span className="bg-moss-400 mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )

    case 'fact':
      return (
        <aside className="border-moss-200 bg-moss-50 rounded-card my-6 border p-5">
          <p className="text-forest-700 flex items-center gap-2 text-sm font-semibold">
            <Info className="size-4.5 shrink-0" />
            {block.title}
          </p>
          <p className="text-ink-700 mt-2 text-[0.9375rem] leading-relaxed">{block.text}</p>
        </aside>
      )

    case 'important':
      return (
        <aside className="bg-forest-800 rounded-card my-8 p-6 text-sand-100">
          <p className="text-moss-300 flex items-center gap-2 text-sm font-semibold">
            <ListChecks className="size-4.5 shrink-0" />
            {block.title ?? 'Viktigt att kunna'}
          </p>
          <ul className="mt-3 space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                <span
                  className="bg-moss-300 mt-2 size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      )

    case 'image':
      return (
        <figure className="my-7">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="rounded-card aspect-16/10 w-full object-cover shadow-soft"
          />
          {block.caption ? (
            <figcaption className="text-ink-500 mt-2.5 text-sm">{block.caption}</figcaption>
          ) : null}
        </figure>
      )

    case 'table':
      return (
        <div className="border-sand-200 rounded-card my-6 overflow-x-auto border">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead className="bg-sand-100">
              <tr>
                {block.headings.map((heading) => (
                  <th key={heading} className="text-ink-700 px-4 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')} className="border-sand-200 border-t">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cell}-${cellIndex}`}
                      className={
                        cellIndex === 0 ? 'text-ink-900 px-4 py-3 font-medium' : 'text-ink-600 px-4 py-3'
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function TheoryBlocks({ blocks }: { blocks: TheoryBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={`${block.kind}-${index}`} block={block} />
      ))}
    </div>
  )
}
