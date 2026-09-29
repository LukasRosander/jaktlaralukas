import { Check, CircleCheck, CircleX, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { BookmarkButton } from '@/components/ui/BookmarkButton'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { SourceList } from '@/components/ui/SourceList'
import { categoryTitle } from '@/data/theory'
import { cn } from '@/utils/cn'
import { answerLetter } from '@/utils/format'
import type { Question } from '@/types'

export interface QuestionCardProps {
  question: Question
  /** `null` while unanswered. */
  selectedAnswer: number | null
  /** Show correct/incorrect state and the explanation. */
  revealed: boolean
  onSelect: (index: number) => void
  /** e.g. "Fråga 4 av 25". */
  counterLabel?: string
  showBookmark?: boolean
  footer?: ReactNode
}

function optionClasses(state: 'idle' | 'selected' | 'correct' | 'incorrect' | 'muted'): string {
  switch (state) {
    case 'selected':
      return 'border-forest-600 bg-forest-50 ring-1 ring-forest-600'
    case 'correct':
      return 'border-moss-500 bg-moss-50 ring-1 ring-moss-500'
    case 'incorrect':
      return 'border-berry-500 bg-berry-50 ring-1 ring-berry-500'
    case 'muted':
      return 'border-sand-200 bg-white opacity-60'
    default:
      return 'border-sand-200 bg-white hover:border-forest-300 hover:bg-sand-50'
  }
}

export function QuestionCard({
  question,
  selectedAnswer,
  revealed,
  onSelect,
  counterLabel,
  showBookmark = true,
  footer,
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-5 sm:p-7">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {counterLabel ? <Pill tone="forest">{counterLabel}</Pill> : null}
          <Pill tone="moss">{categoryTitle(question.categoryId)}</Pill>
          <Pill tone="neutral">{question.difficulty}</Pill>
          {showBookmark ? (
            <span className="ml-auto">
              <BookmarkButton kind="question" refId={question.id} />
            </span>
          ) : null}
        </div>

        <h2 className="text-xl leading-snug font-semibold sm:text-2xl">{question.question}</h2>

        <div role="radiogroup" aria-label="Svarsalternativ" className="mt-5 space-y-2.5">
          {question.answers.map((answer, index) => {
            const chosen = selectedAnswer === index
            const correctOption = index === question.correctAnswer

            let state: 'idle' | 'selected' | 'correct' | 'incorrect' | 'muted' = 'idle'
            if (revealed) {
              if (correctOption) state = 'correct'
              else if (chosen) state = 'incorrect'
              else state = 'muted'
            } else if (chosen) {
              state = 'selected'
            }

            return (
              <button
                key={answer}
                type="button"
                role="radio"
                aria-checked={chosen}
                disabled={revealed}
                onClick={() => onSelect(index)}
                className={cn(
                  'group flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 sm:p-4',
                  optionClasses(state),
                  !revealed && 'active:scale-[0.995]',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200',
                    state === 'correct' && 'bg-moss-500 text-white',
                    state === 'incorrect' && 'bg-berry-500 text-white',
                    state === 'selected' && 'bg-forest-600 text-white',
                    (state === 'idle' || state === 'muted') &&
                      'bg-sand-100 text-ink-600 group-hover:bg-moss-100 group-hover:text-forest-700',
                  )}
                >
                  {state === 'correct' ? (
                    <Check className="size-4.5" />
                  ) : state === 'incorrect' ? (
                    <X className="size-4.5" />
                  ) : (
                    answerLetter(index)
                  )}
                </span>
                <span className="pt-1 text-[0.9375rem] leading-snug">{answer}</span>
              </button>
            )
          })}
        </div>
      </div>

      {revealed ? (
        <div
          className={cn(
            'animate-rise border-t p-5 sm:p-7',
            isCorrect ? 'border-moss-200 bg-moss-50' : 'border-berry-500/20 bg-berry-50',
          )}
        >
          <p
            className={cn(
              'flex items-center gap-2 text-base font-semibold',
              isCorrect ? 'text-forest-700' : 'text-berry-600',
            )}
          >
            {isCorrect ? (
              <CircleCheck className="size-5 shrink-0" />
            ) : (
              <CircleX className="size-5 shrink-0" />
            )}
            {isCorrect ? 'Rätt svar!' : 'Fel svar'}
          </p>
          {!isCorrect ? (
            <p className="text-ink-700 mt-2 text-sm">
              Rätt svar är{' '}
              <strong className="font-semibold">
                {answerLetter(question.correctAnswer)}. {question.answers[question.correctAnswer]}
              </strong>
            </p>
          ) : null}
          <p className="text-ink-700 mt-3 text-[0.9375rem] leading-relaxed">
            {question.explanation}
          </p>
          <SourceList sources={question.sources} />
        </div>
      ) : null}

      {footer ? <div className="border-sand-200 border-t p-4 sm:px-7 sm:py-5">{footer}</div> : null}
    </Card>
  )
}
